I started using Rob Heath's HarnMaster 3.0 sheet but soon I began modifying it to implement automatisms needed for my mental sanity.

After a few iterations, I decided to use Rol20 API to customise the rolls.

Now the sheet uses sheet workers and API to do the job.

I used Aaron's excellent script TheAaronSheet to do some calculations on repeating fields (please note that the script is included in harnsheet.html).

The character sheet is almost completely automated. Every skill is calculated on the fly (even the optional ones, but beware of the syntax - they have to be written correctly to be recognised). They are re-calculated if one of the statistics change. Also, the optional ones can contain other info, as long as the name of the skill is present.
For languages and scripts, they have to contain the word 'language' or 'script'.
So, for example, you can write something like "Harnic (language)" or "Lakise (script)" in one of the languages fields to be recognised and auto-calculated.
All other optional skills can contain other info as well. For example, you can have "Survival (forest)" in the name of the skill - it will compute the survival skill. This behaviour is required because some skills are not generic (musician, survival, etc.).

Any skill can go into any skill category (you can put a "Lore/Craft" skill in the "Physical Skills" section of the sheet), but consider that different categories take into account different penalties. For example, any physical skill gets all the penalties from fatigue, wounds and encumbrance. Lore skills do not consider the penalty from encumbrance (in my interpretation of the rules anyhow - recognising a herb is hardly more difficult while carrying a backpack, but that can be changed in the code of course).

Religion (ritual) needs to be correctly spelled as well. All canonic religions on Harn are valid, plus all the tribal ones as well (agrik, halea, ilvir, larani, morgath, naveh, peoni, sarajin, save-k'nor, siem, adaenum, anoa, bujoc, chelni, chymak, equani, gozyda, hodiri, kabloqui, kamaki, kath, kubora, pagaelin, solori, taelda, tulwyr, urdu, ymodi).

Weapons work much the same. Under "Class" just write the skill name as it is in the manual, i.e. sword or polearm. The sheet will compute the SB, sunsign bonus (if any), starting ML. In the "Type" field, write the specific weapon, i.e. longsword or pike. This will populate the details of that weapon (weight, weapon quality, bonus/malus on attack/defense, impact values). Unarmed is a valid skill (class), and "foot" or "hand" are valid weapons. When blocking, players can easily roll for a weapon break check using the die icon in the WQ field.

Changing any editable detail (in skills, weapons, armour or spells) will save the new value until you change the skill name or, in the case of armour, select another material or piece from the dropdowns. Doing so will auto-compute the new skill/armour piece and overwrite your manual changes, so be careful. In this way a player can change a weapon or armour weight to a custom one, or the impact values of special weapons, or the starting ML for a particular skill, and so on.

Note that the SunSign bonus is taken into account everywhere - but is shown under "SS" in the skills only (exluding languages) due to lack of space in the sheet for certain categories.

Armour weights are calculated automatically, and size is computed in the math. Smaller people will have lighter armour and vice-versa.

I adopted some house rules, so some of the skill rolls are not shown to the players, but whispered to the GM instead. The rolling player will only receive a message that confirms the roll has been made. The list of the skills and stats that have this behaviour is in harncombat.js (the array is called hiddenSkillsList). Every "normal" skill that a player rolls shows only the level of success or failure to everyone (including the player rolling). This is to avoid every player seeing the exact skill total of everyone else. Only the GM sees the total rolled on 1d100, and the EML of the specific skill (the player rolling sees it on his/her character sheet anyway). The GM can choose to send in a whisper the results of the 1d100 to the player that rolled it. This is done via a button that shows on the GM chat on every skill check made by the players.

Spells are seen only by the player casting them and the GM. They show success rate, roll/EML and cant, gestures and noise level that the player selected before rolling. Is up to the GM to describe, according to the cant and gestures level, what the character does (if visible at all). Casting a spell (by a player) automatically causes fatigue to the character (CS = no fatigue, MS and MF = 1 fatigue, CS could cause 2-4 fatigue, depending on the specific critical failure roll). If Fatigue is 4 or more, a whisper informs the GM (a shock roll is needed).

I am using the optional rule that Rituals consume as many piety points as their level. The sheet will check if the priest has enough PP to cast them. If not, the caster (and the GM) will receive a message saying that there aren't enough piety points. Otherwise the ritual will be cast and the piety points subtracted from the total available.

The code is messy, as it has begun as a quick modification of the sheet using sheet workers because of players requests, and in time it accumulated dozens of changes, morphing into something else. I still have to find the courage to start from scratch to produce something neater.

Macros

I use a couple of macros to roll for awareness or other stuff (i.e. hearing, smell, aura, etc.) without the player knowing. Select the token representing the character sheet you want to roll on, and click on the token action macro (you have to create the macro and select the option "Show as token action?"):

Aura

!EML,[[(@{selected|aura}*?{Ease of Challenge|5})-((@{selected|inj_tot_h}*5)+(@{selected|Fatigue}*5))]],[[1d100]],skill,Aura Check,#@{selected|token_name}

Awareness

!EML, @{selected|tot-awareness},[[1d100]],skill,Awareness,#@{selected|token_name}

Eyesight

!EML,[[(@{selected|eyesight}*?{Ease of Challenge|5})-((@{selected|inj_tot_h}*5)+(@{selected|Fatigue}*5))]],[[1d100]],skill,Eyesight Check,#@{selected|token_name}

Hearing

!EML,[[(@{selected|hearing}*?{Ease of Challenge|5})-((@{selected|inj_tot_h}*5)+(@{selected|Fatigue}*5))]],[[1d100]],skill,Hearing Check,#@{selected|token_name}

Smell

!EML,[[(@{selected|smell}*?{Ease of Challenge|5})-((@{selected|inj_tot_h}*5)+(@{selected|Fatigue}*5))]],[[1d100]],skill,Smell Check,#@{selected|token_name}

Stamina

!EML,[[(@{selected|stamina}*?{Ease of Challenge|5})-((@{selected|inj_tot_h}*5)+(@{selected|Fatigue}*5)+((round((round((@{selected|armour_wt_h}+@{selected|weapons_tot_h}+@{selected|gen_equip_wt_h}) / round(((@{selected|CS2sb}*@{selected|CS2ml})+@{selected|CS2ug})/5)))/@{selected|ridingwalking}))*5))]],[[1d100]],skill,Stamina Check,#@{selected|token_name}



Aaron's Github script:

https://github.com/shdwjk/TheAaronSheet/blob/master/TheAaronSheet.js
