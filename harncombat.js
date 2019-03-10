
/* Look-up tables */
var meleeBl = new Array();
meleeBl[0] = ["Both attacker and defender make a FUMBLE roll", "Attacker makes a FUMBLE roll", "Defender gains a Tactical Advantage!", "Defender gains a Tactical Advantage!"];
meleeBl[1] = ["Defender makes a FUMBLE roll", "Defender blocks (weapon break roll)", "Defender gains a Tactical Advantage!", "Defender gains a Tactical Advantage!"];
meleeBl[2] = ["Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender blocks (weapon break roll)", "Defender gains a Tactical Advantage!"];
meleeBl[3] = ["Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender blocks (weapon break roll)"];

var meleeCs = new Array();
meleeCs[0] = ["Both attacker and defender make a FUMBLE roll", "Attacker makes a FUMBLE roll", "Defender deals 2D6 damage", "Defender deals 3D6 damage"];
meleeCs[1] = ["Defender makes a FUMBLE roll", "Defender blocks (weapon break roll)", "Defender deals 1D6 damage", "Defender deals 2D6 damage!"];
meleeCs[2] = ["Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Both attacker and defender deal 1D6 damage", "Defender deals 1D6 damage"];
meleeCs[3] = ["Attacker deals 4D6 damag", "Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Both attacker and defender deal 2D6 damage"];

var meleeDo = new Array();
meleeDo[0] = ["Both attacker and defender make a STUMBLE roll", "Attacker makes a STUMBLE roll", "Defender gains a Tactical Advantage!", "Defender gains a Tactical Advantage!"];
meleeDo[1] = ["Defender makes a STUMBLE roll", "Defender dodges!", "Defender dodges!", "Defender gains a Tactical Advantage!"];
meleeDo[2] = ["Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender dodges!", "Defender dodges!"];
meleeDo[3] = ["Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender dodges!"];

var meleeIg = new Array();
meleeIg[0] = ["Defender gains a Tactical Advantage!", "Attacker deals 1D6 damage!", "Attacker deals 3D6 damage!", "Attacker deals 4D6 damage!"];

var missileBl = new Array();
missileBl[0] = ["Wild shot!", "Wild shot!", "Wild shot!", "Wild shot!"];
missileBl[1] = ["Attacker misses", "Attacker misses", "Attacker misses", "Attacker misses"];
missileBl[2] = ["Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender blocks!", "Defender blocks!"];
missileBl[3] = ["Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender blocks!"];

var missileDo = new Array();
missileDo[0] = ["Wild shot!", "Wild shot!", "Wild shot!", "Wild shot!"];
missileDo[1] = ["Attacker misses", "Attacker misses", "Attacker misses", "Attacker misses"];
missileDo[2] = ["Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender dodges!", "Defender dodges!"];
missileDo[3] = ["Attacker deals 3D6 damage", "Attacker deals 2D6 damage", "Attacker deals 1D6 damage", "Defender dodges!"];

var missileIg = new Array();
missileIg[0] = ["Wild shot!", "Attacker misses", "Attacker deals 2D6 damage!", "Attacker deals 3D6 damage!"];

var hiddenSkillsList = ["hearing","eyesight","smell","intelligence","aura","awareness","weatherlore","tarotry","runecraft","legerdemain","stealth","acting","physician","tracking","survival","astrology"];

on('chat:message', function(msg_orig) {
    if(msg_orig.type == "api" && msg_orig.content.indexOf("!EML") >= 0)
    {
        //log(msg_orig.inlinerolls);
        var msg = _.clone(msg_orig),
            args,attr,amount,chr,token,text='';

        if(_.has(msg,'inlinerolls')){
            msg.content = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msg.content)
                .value();
        }
        var args = msg.content.split(",");
        var eml = parseInt(args[1]);
        //log("=====================EML: "+eml);
        var category = args[5];
        var roll100 = parseInt(args[2]);
        var si = Math.floor(eml/10);
        var newChat = "";
        var critical = "";
        var success = ""
        var pref = "";
        var suff = "}}";
        if(args[4].indexOf("Shock") != 0 && args[4].indexOf("Fumble") != 0 && args[4].indexOf("Stumble") != 0){
            if((div5 == Math.round(div5) || (div5 != Math.round(div5) && roll100 <= si)) && (roll100 <= eml && roll100 <= 95))
            {
                critical = "Critical ";
                success = "Success!";
                pref = "{{cs=";
            }
            else if(div5 == Math.round(div5) && roll100 > eml)
            {
                    critical = "Critical ";
                    success = "Failure!";
                    pref = "{{cf=";
            }
            else if((div5 != Math.round(div5) && roll100 <= eml && roll100 <= 95) || roll100 <= 4)
            {
                critical = "Moderate ";
                success = "Success.";
                pref = "{{ms=";
            }
            else if((div5 != Math.round(div5) && roll100 > eml) || roll100 > 95)
            {   
                critical = "Moderate ";
                success = "Failure.";
                pref = "{{mf=";
            }
        }
        else
        {
            if(roll100 <= eml)
            {   
                critical = "";
                success = "Success!";
                pref = "{{cs=";
            }
            else
            {   
                critical = "";
                success = "Failure!";
                pref = "{{cf=";
            }
        }

        if(category.indexOf("#")>=0){
            category = category.replace("#","");
            pid = category;
        }else{
            var pid = "character|";

            for(var n=0; n<pl.length;n++){
                if (pl[n][0] == msg.who)
                    pid += pl[n][1];
            }
        }
        /*
        for(var k=0; k<args.length;k++)
        {
            if(k == 4)
                {newChat = newChat + "<br />(";}
            newChat = newChat + " " + args[k];
        }
        */
        //newChat = newChat + ")<br />" + pref + "- " + critical + success + " -" + suff;
        newChat = newChat + "&{template:harn} {{" + args[3].toLowerCase() + "=" + args[4] + "}} {{roll=" + roll100 + "}} {{eml=" + eml + "}} " + pref + critical + success + suff;
        //newChat = newChat.replace("Attacks With a ", "{{weapon=");
        //newChat = newChat.replace(" using the ", "}}");
        //newChat = newChat.replace(" skill ", "}}");
        //newChat = newChat.replace(" !EML", "/direct EML");
        //log(newChat);
        var skillName = args[4].toLowerCase();
        var hidden = false;
        for(var t=0; t<hiddenSkillsList.length;t++){
            if(skillName.indexOf(hiddenSkillsList[t]) >= 0)
                hidden = true;
        }

        if(hidden){
            var article = "a";
            var endcheck = " roll...";
            if(args[4].toLowerCase().indexOf("a") == 0 || args[4].toLowerCase().indexOf("e") == 0 || args[4].toLowerCase().indexOf("i") == 0 || args[4].toLowerCase().indexOf("o") == 0 || args[4].toLowerCase().indexOf("u") == 0) {
                article +="n";
            }
            if(args[4].toLowerCase().indexOf("check") >= 0){
                endcheck = "";
            }
            var player = "You make " + article + " " + args[4] + endcheck;
        }else{
            var player = "/w " + msg.who + " " + newChat;
        }
        
        var master = "/w GM " + newChat;
        sendChat(pid, master);
        //if(msg.who.indexOf("(GM)") < 0)
            //sendChat(msg.who, player);
      
    }
    else if(msg_orig.type == "api" && msg_orig.content.indexOf("!SEML") >= 0)
    {
        //log(msg_orig.inlinerolls);

        var msg = _.clone(msg_orig),
            args,attr,amount,chr,token,text='';

        if(_.has(msg,'inlinerolls')){
            msg.content = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msg.content)
                .value();
        }
        var character = findObjs({ type: 'character', name: msg.who })[0];
        if(character)
        {
            var fatigueAttr = findObjs({ type: 'attribute', characterid: character.id, name: 'Fatigue' })[0];
            var pietyAttr = findObjs({ type: 'attribute', characterid: character.id, name: 'piety' })[0];
            var fatigueLevel = Number(getAttrByName(character.id,'Fatigue'));
            var pietyLevel = Number(getAttrByName(character.id,'piety'));
        }

        var args = msg.content.split(",");
        var eml = parseInt(args[1]);
        var roll100 = parseInt(args[2]);
        var spellFatigue;
        //log("roll100: "+roll100);
        var newChat = "";
        var critical = "";
        var success = ""
        var pref = "";
        var suff = "}}";
        var si = Math.floor(eml/10);
        var div5 = roll100/5;
        var failureResults = "";
        var cantDesc;
        var gestDesc;
        var noisDesc;
        var allowedToCast = true;
        switch (Number(args[6]))
        {
            case -10:
                cantDesc = "Silence";
                break;
            case -5:
                cantDesc = "Whispering";
                break;
            case 0:
                cantDesc = "Normal voice";
                break;
            case 5:
                cantDesc = "Shouting";
                break;
        }
        switch (Number(args[7]))
        {
            case -10:
                gestDesc = "No movement";
                break;
            case -5:
                gestDesc = "Small movements";
                break;
            case 0:
                gestDesc = "Normal movements";
                break;
            case 5:
                gestDesc = "Extreme movements";
                break;
        }
        switch (Number(args[8]))
        {
            case 5:
                noisDesc = "Silence";
                break;
            case 0:
                noisDesc = "Small noises";
                break;
            case -5:
                noisDesc = "Normal noises";
                break;
            case -10:
                noisDesc = "Extreme noises";
                break;
            case -15:
                noisDesc = "Combat";
                break;
        }

        if((div5 == Math.round(div5) || (div5 != Math.round(div5) && roll100 <= si)) && (roll100 <= eml && roll100 <= 95))
            {
                critical = "Critical ";
                success = "Success!";
                pref = "{{cs=";
                spellFatigue = 0;
            }
            else if(div5 == Math.round(div5) && roll100 > eml)
            {
                    critical = "Critical ";
                    success = "Failure!";
                    pref = "{{cf=";
                    spellFatigue = 1;
                    var failureRoll = randomInteger(100);
                    failureResults = "Failure Roll: " + failureRoll + "<br>";
                    if(failureRoll<=40)
                    {
                        spellFatigue += randomInteger(3);
                        failureResults += "Form Failure - " + spellFatigue + " Fatigue Levels accumulated due to shock.";
                    }
                    else if(failureRoll > 40 && failureRoll <= 50)
                    {
                        failureResults += "Aural Shock - Cannot use spells and psionics. Every 4 hours a d100 roll can be made (even if unconscious) and if < Aura then the powers are restored.";
                    }
                    else if(failureRoll > 50 && failureRoll <= 60)
                    {
                        failureResults += "Confusion - Wrong spell has been casted!";
                    }
                    else if(failureRoll > 60 && failureRoll <= 70)
                    {
                        failureResults += "Damage - A Focus will work erratically or not at all until repaired. If no focus has been used, an Aura Shock has been sustained instead (no spells or psionics, roll 1d100 < Aura every 4 hours to recover).";
                    }
                    else if(failureRoll > 70 && failureRoll <= 80)
                    {
                        failureResults += "Distortion - The power, direction, target and/or duration are different (can be less or more).";
                    }
                    else if(failureRoll > 80 && failureRoll <= 90)
                    {
                        failureResults += "Summoning - Appropriate elemental is summoned. Reaction depends on type of spell that was being cast.";
                    }
                    else if(failureRoll > 90 && failureRoll <= 99)
                    {
                        failureResults += "Wild Spell - The spell is miscast. For example, casting a fireball it could explode prematurely or even in the caster's hand.";
                    }
                    else
                    {
                        failureResults += "Total Release - Catastrophic! See Shek-P'Var 11. Good luck!";
                    }
            }
            else if((div5 != Math.round(div5) && roll100 <= eml && roll100 <= 95) || roll100 <= 4)
            {
                critical = "Moderate ";
                success = "Success.";
                pref = "{{ms=";
                spellFatigue = 1;
            }
            else if((div5 != Math.round(div5) && roll100 > eml) || roll100 > 95)
            {   
                critical = "Moderate ";
                success = "Failure.";
                pref = "{{mf=";
                spellFatigue = 1;
            }
        //log("Failure: "+failureResults);
        if(character)
        {
            if(args[3].toLowerCase() == "rit")
            {
                pietyLevel -= Number(args[9]);
                if(pietyLevel<0)
                {
                    pietyLevel += Number(args[9]);
                    allowedToCast = false;
                }
                else
                {
                    pietyAttr.set('current', pietyLevel);
                }
            }
            else
            {
                fatigueLevel += spellFatigue;
                fatigueAttr.set('current', fatigueLevel);
                if (fatigueLevel>=4)
                    sendChat("Auto Message", "/w GM Shock roll needed for " + msg.who + "!");
            }
        }
        var pid = "character|";

        for(var n=0; n<pl.length;n++){
            if (pl[n][0] == msg.who)
                pid += pl[n][1];
            else
                pid = msg.who;
        }

        if(allowedToCast)
            newChat += "&{template:harn} {{" + args[3].toLowerCase() + "=" + args[4] + "}} " + pref + critical + success + suff + " {{spellroll=" + roll100 + "}} {{spelleml=" + eml + "<br>" + cantDesc + ", " + gestDesc + ", " + noisDesc + "}} {{spellfailure=" + failureResults + "}}";
        else
            newChat += "Not enough Piety Points to perform the Ritual!";
        //gmChat = newChat + "&{template:harn} {{spellroll=" + roll100 + "}} {{eml=" + eml + "<br>" + cantDesc + ", " + gestDesc + ", " + noisDesc + "}}";
        var player = "/w " + msg.who + " " + newChat;
        var master = "/w GM " + newChat;
        sendChat(pid, master);
        if(msg.who.indexOf("(GM)") < 0)
            sendChat(pid, player);
      
    }
    else if(msg_orig.type == "api" && msg_orig.content.indexOf("!HHEML") >= 0)
    {
        var msg = _.clone(msg_orig),
            args,attr,amount,chr,token,text='';

        if(_.has(msg,'inlinerolls')){
            msg.content = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msg.content)
                .value();
        }
        var args = msg.content.split(",");
        var eml = parseInt(args[1]);
        var si = Math.floor(eml/10);
        var roll100 = parseInt(args[2]);
        var skillName = args[4].toLowerCase();
        var category = args[5];
        var div5 = roll100/5;
        var critical = "";
        var success = "";
        //var newChat = "/w GM ";

        var newChat = "/w " + msg.who + " ";
        var gmChat = "/w gm ";
        var pref = "";
        var suff = "}}";
        if(args[4].indexOf("Shock") != 0 && args[4].indexOf("Fumble") != 0 && args[4].indexOf("Stumble") != 0){
            if((div5 == Math.round(div5) || (div5 != Math.round(div5) && roll100 <= 5)) && (roll100 <= eml && roll100 <= 95))
            {
                critical = "Critical ";
                success = "Success!";
                pref = "{{cs=";
            }
            else if(div5 == Math.round(div5) && roll100 > eml)
            {
                    critical = "Critical ";
                    success = "Failure!";
                    pref = "{{cf=";
            }
            else if((div5 != Math.round(div5) && roll100 <= eml && roll100 <= 95) || roll100 <= 4)
            {
                critical = "Moderate ";
                success = "Success.";
                pref = "{{ms=";
            }
            else if((div5 != Math.round(div5) && roll100 > eml) || roll100 > 95)
            {   
                critical = "Moderate ";
                success = "Failure.";
                pref = "{{mf=";
            }
        }
        else
        {
            if(roll100 <= eml)
            {   
                critical = "";
                success = "Success!";
                pref = "{{cs=";
            }
            else
            {   
                critical = "";
                success = "Failure!";
                pref = "{{cf=";
            }
        }

        if(category.indexOf("#")>=0){
            category = category.replace("#","");
            pid = category;
        }else{
            var pid = "character|";

            for(var n=0; n<pl.length;n++){
                if (pl[n][0] == msg.who)
                    pid += pl[n][1];
                else
                    pid = msg.who;
            }
        }

        //newChat = newChat + "&{template:harn} {{" + args[3].toLowerCase() + "=" + args[4] + "}} {{roll=" + roll100 + "}} {{eml=" + eml + "}} " + pref + critical + success + suff;
        newChat = newChat + "&{template:harn} {{roll=" + roll100 + "}} {{eml=" + eml + "}}";
        gmChat += "&{template:harn} {{roll=" + roll100 + "}} {{eml=" + eml + "}} {{who=" + msg.who + "}}";
        publicChat = "&{template:harn} {{" + args[3].toLowerCase() + "=" + args[4] + "}} " + pref + critical + success + suff;
        
        var hidden = false;
        for(var t=0; t<hiddenSkillsList.length;t++){
            if(skillName.indexOf(hiddenSkillsList[t]) >= 0)
                hidden = true;
        }

        if(hidden){
            var article = "a";
            var endcheck = " roll...";
            if(args[4].toLowerCase().indexOf("a") == 0 || args[4].toLowerCase().indexOf("e") == 0 || args[4].toLowerCase().indexOf("i") == 0 || args[4].toLowerCase().indexOf("o") == 0 || args[4].toLowerCase().indexOf("u") == 0) {
                article +="n";
            }
            if(args[4].toLowerCase().indexOf("check") >= 0){
                endcheck = "";
            }
            var player = "/w " + msg.who + " You make " + article + " " + args[4] + endcheck;
            if(msg.who.indexOf("(GM)") < 0)
                sendChat(pid, player);
            sendChat(pid, "/w GM (hidden from player) " + publicChat + " {{roll=" + roll100 + "}} {{eml=" + eml + "}} {{who=" + msg.who + "}}");
        }else{
            sendChat(pid, publicChat);
            //sendChat(pid, newChat);
            if(msg.who.indexOf("(GM)") < 0)
                sendChat(pid, gmChat);
        }


    }

});

on('chat:message', function(msg) {
    var command = msg.content.toLowerCase();
    if(msg.type == "api" && (command.indexOf("!me") >= 0 || command.indexOf("!mi") >=0)) {
     var stringa = command.replace("!", "");
    log(hitRoll(stringa));
    sendChat("Combat", hitRoll(stringa));
    return;
    }
});
on('chat:message', function(msg) {
    var command = msg.content.toLowerCase();
    if(msg.type == "api" && command.indexOf("!br") >= 0) {
     var stringa = command.replace("!", "");
     log(stringa);
     sendChat("Weapon Break Roll", weaponRoll(stringa));
    return;
    }
});
function rollDamage(stringa, dam)
{
    if(stringa.indexOf("D6")>0)
    {
        var diePos = stringa.indexOf("D6")-1;
        var numDice = parseInt(stringa.substring(diePos,diePos+1));
        var strLeft = stringa.substring(0, diePos);
        var strRight = stringa.substring(diePos+3, stringa.length);
        var tot = 0;
        for(var n=0; n<numDice; n++)
        {
            tot += randomInteger(6);
        }
        tot += dam;
        return strLeft + tot + strRight;
    }
    else
        return stringa;
}

//function escapeHtml(unsafe) {
//   return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, """).replace(/'/g, "'");
// }

function hitRoll(stringa)
{
   stringa = stringa.toLowerCase();
   stringa = stringa.split(" ");
   numParams = stringa.length;
   atttype = stringa[0];
    maneuver = stringa[1];
    attacker = stringa[2];
    if(maneuver != "ig")
        {   
            if(stringa[3] != "cf" && stringa[3] != "mf" && stringa[3] != "ms" && stringa[3] != "cs")
                {return ("/w gm Invalid defense result!");}
            else
                {defender = stringa[3];}
        }
        else
            {defender = "";}
        damage = parseInt(stringa[4]);
        //location = stringa[5];
        att = 0;
        def = 0;

        if(attacker == "mf")
            {att = 1;}
        else if(attacker == "ms")
            {att = 2;}
        else if(attacker == "cs")
            {att = 3;}
       

       if(defender == "mf")
            {def = 1;}
        else if(defender == "ms")
            {def = 2;}
        else if(defender == "cs")
            {def = 3;}
        
        if(atttype == "me")
        {
            if(maneuver == "bl")
                {return rollDamage(meleeBl[att][def], damage);}
            else if(maneuver == "cs")
                {return rollDamage(meleeCs[att][def], damage);}
            else if(maneuver == "do")
                {return rollDamage(meleeDo[att][def], damage);}
            else
                {return rollDamage(meleeIg[0][att], damage);}
        }
        else if(atttype = "mi")
        {
            if(maneuver == "bl")
                {return rollDamage(missileBl[att][def], damage);}
            else if(maneuver == "cs")
                {return ("A missile attack does not allow a counterstrike!");}
            else if(maneuver == "do")
                {return rollDamage(missileDo[att][def], damage);}
            else
                {return rollDamage(missileIg[0][att], damage);}
        }
    
}

function weaponRoll(stringa)
{
    var args = stringa.split(",");
    var cname = args[1];
    var wq = parseInt(args[2]);
    var wName = args[3];
    var modifier = args[4];
    wq += Number(modifier);
    roll = randomInteger(6) + randomInteger(6) + randomInteger(6);
    if(wq >= roll)
        {return (cname + "'s " + wName + " withstands the strike!");}
    else
        {return (cname + "'s " + wName + " BREAKS!");}
}

var pl = new Array();

on('ready',function() {
    'use strict';
    var characters=findObjs({_type:'character'});
    _.each(characters,function (obj){
        pl.push([obj.get('name'), obj.get('id')]);
    });
});
