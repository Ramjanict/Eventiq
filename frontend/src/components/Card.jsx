import React from "react";
import Listen from "@/components/Listen";
import Share from "@/components/Share";
const Card = () => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-white rounded-md">
      <div className="flex items-center gap-2">
        <img src="/allah.png" alt="allah" />
        <p className="font-medium text-green">
          2. The servant is dependent on his Lord #2
        </p>
      </div>
      <div className="flex flex-col gap-6 text-[#393939] text-justify">
        <p className="text-lg font-medium ">
          Prophet (ﷺ) used to say after every compulsory prayer, The servant
          will ask his Lord for all of his religiously and worldly needs,
          because the treasure of all things is in the hands of Allah. Allah
          says (interpretation of the meaning): “And there is not a thing but
          that with Us are its depositories, and We do not send it down except
          according to a known measure.” (Sura Al-Hijr 15:21) No one can
          withhold what Allah gives; And, no one can give what he resists.
        </p>
        <p className="text-2xl text-end">
          لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ
          وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا
          مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ
          ذَا الْجَدِّ مِنْكَ الْجَدُّ
        </p>
        <p className="text-lg font-medium ">
          <span className="font-bold">Transliteration:</span> Laa ilaaha
          illallahu wahdahu laa sharika lahu, lahul-mulku wa lahul-hamdu wa huwa
          'alaa kulli shay'in qadir. Allaahumma laa maani'a limaa a'taita wa laa
          mu'tia limaa mana'ta wa laa yanfa'u dhal-jaddi minka al-jaddu
        </p>
        <p>
          <span className="font-bold"> Translation:</span> There is none worthy
          of worship except Allah alone with no partner or associate. He is the
          Dominion and to Him be all praise, and He is able to do all things. O
          Allah, one can withhold what You have given and none can give what You
          have withheld, and no wealth or fortune can benefit anyone for from
          You comes all wealth and fortune.
        </p>
        <div>
          <p className="text-lg font-bold text-green">Reference</p>
          <p className="font-bold"> Bukhari: 844</p>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <Listen />
        <Share />
      </div>
    </div>
  );
};

export default Card;
