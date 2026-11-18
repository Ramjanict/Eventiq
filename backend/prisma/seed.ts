import {
  PrismaClient,
  UserRole,
  UserStatus,
  SpaceType,
  SpaceStatus,
  EventStatus,
  EventFormat,
  PlanOrganizerType,
  PlanBillingCycle,
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'Password123!';

export async function main() {
  console.log('--- Starting User Creation for All Roles ---');
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  // 1. Ensure Default Plans exist
  console.log('\n[1/7] Ensuring default membership plans exist...');
  const plansData = [
    {
      slug: 'plan-individual-pro',
      planName: 'Individual Pro',
      description: 'Full access to personal event creation, ticketing, and turnstile gate crew.',
      price: 15000,
      currency: 'NGN',
      organizerType: PlanOrganizerType.INDIVIDUAL,
      billingCycle: PlanBillingCycle.MONTHLY,
      features: ['Unlimited RSVPs', 'Gate Scanner Access', 'WhatsApp & Email Invites', 'Realtime Check-in Analytics'],
    },
    {
      slug: 'plan-agency-enterprise',
      planName: 'Agency Enterprise',
      description: 'Comprehensive workspace for agencies managing multi-brand corporate events.',
      price: 85000,
      currency: 'NGN',
      organizerType: PlanOrganizerType.AGENCY,
      billingCycle: PlanBillingCycle.MONTHLY,
      features: ['Multi-Client Management', 'B2B Invoicing', 'Team Permissions', 'Dedicated Account Manager'],
    },
    {
      slug: 'plan-venue-premier',
      planName: 'Venue Premier',
      description: 'Complete venue operations suite for managing halls, booking calendars, and seating layouts.',
      price: 65000,
      currency: 'NGN',
      organizerType: PlanOrganizerType.VENUE,
      billingCycle: PlanBillingCycle.MONTHLY,
      features: ['Multi-Space Management', 'Calendar Scheduling', 'Banquet Table Layouts', 'Turnstile Gate Integration'],
    },
  ];

  const createdPlans: Record<string, any> = {};
  for (const p of plansData) {
    const plan = await prisma.plan.upsert({
      where: { slug: p.slug },
      update: {
        planName: p.planName,
        price: p.price,
        description: p.description,
        features: p.features,
      },
      create: p,
    });
    createdPlans[p.organizerType] = plan;
    console.log(`  ✓ Plan ready: ${plan.planName} (${plan.slug})`);
  }

  // 2. Platform Super Admin (ADMIN)
  console.log('\n[2/7] Creating / updating Platform Admin (ADMIN)...');
  const adminEmail = 'admin@eventiq.com';
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      fullName: 'Eventiq Platform Admin',
      passwordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: adminEmail,
      fullName: 'Eventiq Platform Admin',
      passwordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      profile: {
        create: {
          bio: 'Platform governance, global analytics, and master system operations.',
          company: 'Eventiq Technologies',
          jobTitle: 'Super Administrator',
        },
      },
    },
    include: { profile: true },
  });
  console.log(`  ✓ ADMIN user: ${adminUser.email} (ID: ${adminUser.id})`);

  // 3. Individual Event Organizer (INDIVIDUAL)
  console.log('\n[3/7] Creating / updating Individual Organizer (INDIVIDUAL)...');
  const individualEmail = 'individual@eventiq.com';
  let individualUser = await prisma.user.findUnique({ where: { email: individualEmail } });
  if (individualUser) {
    individualUser = await prisma.user.update({
      where: { email: individualEmail },
      data: {
        fullName: 'Sarah Jenkins',
        passwordHash,
        role: UserRole.INDIVIDUAL,
        status: UserStatus.ACTIVE,
      },
    });
  } else {
    individualUser = await prisma.user.create({
      data: {
        email: individualEmail,
        fullName: 'Sarah Jenkins',
        passwordHash,
        phone: '+2348011112222',
        role: UserRole.INDIVIDUAL,
        status: UserStatus.ACTIVE,
        profile: {
          create: {
            bio: 'Independent producer of premium celebrations and creative technology showcases.',
            company: 'Jenkins Event Studio',
            jobTitle: 'Lead Event Producer',
          },
        },
      },
    });
  }

  // Ensure subscription for Individual
  const indSub = await prisma.subscription.findFirst({ where: { userId: individualUser.id } });
  if (!indSub && createdPlans[PlanOrganizerType.INDIVIDUAL]) {
    await prisma.subscription.create({
      data: {
        userId: individualUser.id,
        planId: createdPlans[PlanOrganizerType.INDIVIDUAL].id,
        status: 'active',
      },
    });
  }

  // Ensure a sample event exists for Individual
  const sampleEventSlug = 'tech-innovators-summit-2026';
  const existingEvent = await prisma.event.findUnique({ where: { slug: sampleEventSlug } });
  if (!existingEvent) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 14);
    startDate.setHours(10, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(18, 0, 0, 0);

    await prisma.event.create({
      data: {
        organizerId: individualUser.id,
        title: 'Tech Innovators Summit 2026',
        slug: sampleEventSlug,
        description: 'Annual gathering of founders, venture leaders, and engineers building the next era of digital infrastructure.',
        category: 'Technology & Networking',
        format: EventFormat.HYBRID,
        status: EventStatus.PUBLISHED,
        startDate,
        endDate,
        timezone: 'Africa/Lagos',
        venueName: 'The Landmark Grand Ballroom',
        address: 'Water Corporation Drive, Victoria Island, Lagos',
        capacity: 500,
        currency: 'NGN',
        ticketTiers: {
          create: [
            {
              name: 'General Admission',
              description: 'Standard access to keynote talks and networking lounge.',
              price: 15000,
              capacity: 350,
              type: 'GENERAL',
            },
            {
              name: 'VIP All-Access',
              description: 'Access to speaker reception, fast-track check-in, and banquet seating.',
              price: 50000,
              capacity: 150,
              type: 'VIP',
            },
          ],
        },
      },
    });
    console.log(`  ✓ Sample event created: Tech Innovators Summit 2026`);
  }
  console.log(`  ✓ INDIVIDUAL user: ${individualUser.email} (ID: ${individualUser.id})`);

  // 4. Agency Organizer (AGENCY)
  console.log('\n[4/7] Creating / updating Agency Organizer (AGENCY)...');
  const agencyEmail = 'agency@eventiq.com';
  let agencyUser = await prisma.user.findUnique({
    where: { email: agencyEmail },
    include: { agencyProfile: true },
  });

  if (agencyUser) {
    agencyUser = await prisma.user.update({
      where: { email: agencyEmail },
      data: {
        fullName: 'Marcus Sterling',
        passwordHash,
        role: UserRole.AGENCY,
        status: UserStatus.ACTIVE,
      },
      include: { agencyProfile: true },
    });
  } else {
    agencyUser = await prisma.user.create({
      data: {
        email: agencyEmail,
        fullName: 'Marcus Sterling',
        passwordHash,
        phone: '+2348022223333',
        role: UserRole.AGENCY,
        status: UserStatus.ACTIVE,
        profile: {
          create: {
            bio: 'Principal Director at Apex Event Partners managing enterprise client portfolios.',
            company: 'Apex Event Partners',
            jobTitle: 'Managing Director',
          },
        },
        agencyProfile: {
          create: {
            agencyName: 'Apex Event Partners',
            billingEmail: agencyEmail,
            headquarters: 'Victoria Island, Lagos, Nigeria',
            standardCommission: 15.0,
            corporateTaxId: 'TAX-APEX-998822',
            website: 'https://apexevents.example.com',
          },
        },
      },
      include: { agencyProfile: true },
    });
  }

  // Ensure Agency Profile exists
  if (!agencyUser.agencyProfile) {
    await prisma.agencyProfile.create({
      data: {
        userId: agencyUser.id,
        agencyName: 'Apex Event Partners',
        billingEmail: agencyEmail,
        headquarters: 'Victoria Island, Lagos, Nigeria',
        standardCommission: 15.0,
        corporateTaxId: 'TAX-APEX-998822',
        website: 'https://apexevents.example.com',
      },
    });
  }

  // Ensure a sample Agency Client exists
  const existingAgencyProfile = await prisma.agencyProfile.findUnique({ where: { userId: agencyUser.id } });
  if (existingAgencyProfile) {
    const existingClient = await prisma.agencyClient.findFirst({ where: { agencyId: existingAgencyProfile.id } });
    if (!existingClient) {
      await prisma.agencyClient.create({
        data: {
          agencyId: existingAgencyProfile.id,
          name: 'Global Fintech Alliance',
          industry: 'Financial Technology',
          contactPerson: 'Jessica Cole',
          contactEmail: 'jessica@globalfintech.example.com',
          contactPhone: '+2348099998888',
          status: 'active',
          contractTotal: 25000000,
          currency: 'NGN',
        },
      });
      console.log(`  ✓ Sample agency client created: Global Fintech Alliance`);
    }
  }

  // Ensure subscription for Agency
  const agSub = await prisma.subscription.findFirst({ where: { userId: agencyUser.id } });
  if (!agSub && createdPlans[PlanOrganizerType.AGENCY]) {
    await prisma.subscription.create({
      data: {
        userId: agencyUser.id,
        planId: createdPlans[PlanOrganizerType.AGENCY].id,
        status: 'active',
      },
    });
  }
  console.log(`  ✓ AGENCY user: ${agencyUser.email} (ID: ${agencyUser.id})`);

  // 5. Venue Manager / Organizer (VENUE)
  console.log('\n[5/7] Creating / updating Venue Organizer (VENUE)...');
  const venueEmail = 'venue@eventiq.com';
  let venueUser = await prisma.user.findUnique({
    where: { email: venueEmail },
    include: { venueProfile: true },
  });

  if (venueUser) {
    venueUser = await prisma.user.update({
      where: { email: venueEmail },
      data: {
        fullName: 'Elena Vance',
        passwordHash,
        role: UserRole.VENUE,
        status: UserStatus.ACTIVE,
      },
      include: { venueProfile: true },
    });
  } else {
    venueUser = await prisma.user.create({
      data: {
        email: venueEmail,
        fullName: 'Elena Vance',
        passwordHash,
        phone: '+2348033334444',
        role: UserRole.VENUE,
        status: UserStatus.ACTIVE,
        profile: {
          create: {
            bio: 'General Manager of The Grand Horizon Convention Centre.',
            company: 'Grand Horizon Venues Ltd',
            jobTitle: 'Venue General Manager',
          },
        },
        venueProfile: {
          create: {
            propertyName: 'The Grand Horizon Convention Centre',
            address: 'Plot 14 Admiralty Way, Lekki Phase 1',
            city: 'Lagos',
            state: 'Lagos State',
            country: 'Nigeria',
            securityHotline: '+234800-HORIZON',
            compoundCapacity: 4500,
          },
        },
      },
      include: { venueProfile: true },
    });
  }

  // Ensure Venue Profile & Sample Space exists
  const existingVenueProfile = await prisma.venueProfile.findUnique({
    where: { userId: venueUser.id },
    include: { spaces: true },
  });
  if (existingVenueProfile && existingVenueProfile.spaces.length === 0) {
    await prisma.venueSpace.createMany({
      data: [
        {
          venueId: existingVenueProfile.id,
          name: 'The Imperial Ballroom',
          type: SpaceType.BALLROOM,
          capacity: 2000,
          squareMeters: 1800,
          hourlyRate: 150000,
          dailyRate: 1500000,
          currency: 'NGN',
          status: SpaceStatus.AVAILABLE,
          address: 'Main Complex Floor 1',
          description: 'Acoustically engineered grand hall equipped with intelligent lighting, AV system, and banquet amenities.',
          amenities: ['Central Air Conditioning', '4K Projection Screen', 'Bridal Dressing Suite', 'VIP Green Room', 'Backup Generators'],
        },
        {
          venueId: existingVenueProfile.id,
          name: 'Skyline Rooftop Terrace',
          type: SpaceType.ROOFTOP,
          capacity: 450,
          squareMeters: 550,
          hourlyRate: 85000,
          dailyRate: 750000,
          currency: 'NGN',
          status: SpaceStatus.AVAILABLE,
          address: 'Tower Penthouse',
          description: 'Panoramic open-air terrace with waterfront views of the Lekki skyline.',
          amenities: ['Custom Cocktail Bar', 'Mood Lighting', 'Retractable Canopy', 'Private Elevator Access'],
        },
      ],
    });
    console.log(`  ✓ Sample venue spaces created: The Imperial Ballroom & Skyline Rooftop Terrace`);
  }

  // Ensure subscription for Venue
  const venSub = await prisma.subscription.findFirst({ where: { userId: venueUser.id } });
  if (!venSub && createdPlans[PlanOrganizerType.VENUE]) {
    await prisma.subscription.create({
      data: {
        userId: venueUser.id,
        planId: createdPlans[PlanOrganizerType.VENUE].id,
        status: 'active',
      },
    });
  }
  console.log(`  ✓ VENUE user: ${venueUser.email} (ID: ${venueUser.id})`);

  // 6. Gate Staff Scanner (GATE)
  console.log('\n[6/7] Creating / updating Gate Staff Scanner (GATE)...');
  const gateEmail = 'gate@eventiq.com';
  let gateUser = await prisma.user.findUnique({
    where: { email: gateEmail },
    include: { staffProfile: true },
  });

  if (gateUser) {
    gateUser = await prisma.user.update({
      where: { email: gateEmail },
      data: {
        fullName: 'David Kalu',
        passwordHash,
        role: UserRole.GATE,
        status: UserStatus.ACTIVE,
      },
      include: { staffProfile: true },
    });
  } else {
    gateUser = await prisma.user.create({
      data: {
        email: gateEmail,
        fullName: 'David Kalu',
        passwordHash,
        phone: '+2348044445555',
        role: UserRole.GATE,
        status: UserStatus.ACTIVE,
        profile: {
          create: {
            bio: 'Senior gate operations supervisor for access control and QR scanning.',
            company: 'Eventiq Gate Operations',
            jobTitle: 'Access Control Officer',
          },
        },
        staffProfile: {
          create: {
            gateCode: 'GATE-A1',
            deviceId: 'TERMINAL-L01',
          },
        },
      },
      include: { staffProfile: true },
    });
  }

  // Ensure Gate Profile exists
  if (!gateUser.staffProfile) {
    await prisma.gateStaffProfile.create({
      data: {
        userId: gateUser.id,
        gateCode: 'GATE-A1',
        deviceId: 'TERMINAL-L01',
      },
    });
  }
  console.log(`  ✓ GATE user: ${gateUser.email} (ID: ${gateUser.id})`);

  // 7. Event Guest / Attendee (GUEST)
  console.log('\n[7/7] Creating / updating Event Guest (GUEST)...');
  const guestEmail = 'guest@eventiq.com';
  let guestUser = await prisma.user.findUnique({
    where: { email: guestEmail },
  });

  if (guestUser) {
    guestUser = await prisma.user.update({
      where: { email: guestEmail },
      data: {
        fullName: 'Amara Okafor',
        passwordHash,
        role: UserRole.GUEST,
        status: UserStatus.ACTIVE,
      },
    });
  } else {
    guestUser = await prisma.user.create({
      data: {
        email: guestEmail,
        fullName: 'Amara Okafor',
        passwordHash,
        phone: '+2348055556666',
        role: UserRole.GUEST,
        status: UserStatus.ACTIVE,
        profile: {
          create: {
            bio: 'Tech enthusiast and frequent conference delegate.',
            company: 'Nexus Creative Labs',
            jobTitle: 'Product Designer',
            dietaryPreference: 'Vegetarian',
            notificationEmail: true,
            notificationSms: true,
          },
        },
      },
    });
  }
  console.log(`  ✓ GUEST user: ${guestUser.email} (ID: ${guestUser.id})`);

  console.log('\n=== All 6 User Roles Successfully Initialized in Database! ===\n');
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
