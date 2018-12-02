I started using Rob Heath's HarnMaster 3.0 sheet but soon I began modifying it to implement automatisms needed for my mental sanity.

After a few iterations, I decided to use Rol20 API to customise the rolls.

Now the sheet uses sheet workers and API to do the job.

I used Aaron's excellent script TheAaronSheet to do some calculations on repeating fields.

The character sheet is almost completely automated. Every skill is calculated on the fly (even the optional ones, but beware of the syntax - they have to be written correctly to be recognised). They are re-calculated if one of the statistics change. Also, the optional ones can contain other info, as long as the name of the skill is present.
For languages and scripts, they have to contain the word 'language' or 'script'.
So, for example, you can write something like "Harnic (language)" or "Lakise (script)" in one of the languages fields to be recognised and auto-calculated.
All other optional skills can contain other info as well. For example, you can have "Survival (forest)" in the name of the skill - it will compute the survival skill. This behaviour is required because some skills are not generic (musician, survival, etc.).

The SunSing bonus is taken into account everywere (although it is not shown for weapons skills and spells).

Armour weights are calculated automatically, and size is computed in the math. Smaller people will have lighter armour and vice-versa.

I adopted some house rules, so some of the skill rolls are not shown to the players, but whispered to the GM instead. The rolling player will only receive a message that confirms the roll. The list of the skills and stats that have this behaviour is in harncombat.js (called hiddenSkillsList).

The code is messy, as it has begun as a quick modification of the sheet using sheet workers because of players requests, and in time it accumulated dozens of changes, morphing into something else. I still have to find the courage to start from scratch to produce something neater.

Aaron's Github script:

https://github.com/shdwjk/TheAaronSheet/blob/master/TheAaronSheet.js
