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

var hiddenSkillsList = "hearing,eyesight,smell,intelligence,aura,awareness,weatherlore,tarotry,runecraft,legerdemain,stealth,acting,physician,tracking,survival,astrology";

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
        var roll100 = parseInt(args[2]);
        
        var newChat = "";
        var critical = "Moderate ";
        var success = "Failure!"
        var pref = "{{mf=";
        var suff = "}}";
        if(args[4].indexOf("Shock") != 0 && args[4].indexOf("Fumble") != 0 && args[4].indexOf("Stumble") != 0){
            var div5 = roll100/5;
            if(div5 == Math.round(div5))
            {
                critical = "Critical ";
                if((roll100 <= eml && roll100 <= 95) || roll100 <= 5)
                {
                    pref = "{{cs=";
                }
                else
                {
                    pref = "{{cf=";
                }
            }
            if((roll100 <= eml && roll100 <= 95) || roll100 <= 5)
            {   
                success = "Success!";
                if(div5 != Math.round(div5))
                {
                    pref = "{{ms=";
                }

            }
        }
        else{
            critical = "";
            if(roll100 <= eml)
            {   
                success = "Success!";
                pref = "{{ms=";
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
        if(hiddenSkillsList.indexOf(skillName) >= 0){
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
        sendChat(msg.who, master);
        if(msg.who.indexOf("(GM)") < 0)
            sendChat(msg.who, player);
      
    }
    else if(msg_orig.type == "api" && msg_orig.content.indexOf("!SEML") >= 0)
    {
        log(msg_orig.inlinerolls);
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
        var roll100 = parseInt(args[2]);
        //log("roll100: "+roll100);
        var newChat = "";
        var critical = "Moderate ";
        var success = "Failure!"
        var pref = "{{mf=";
        var suff = "}}";

        var div5 = roll100/5;
        if(div5 == Math.round(div5))
        {
            critical = "Critical ";
            if((roll100 <= eml && roll100 <= 95) || roll100 <= 5)
            {
                pref = "{{cs=";
            }
            else
            {
                pref = "{{cf=";
            }
        }
        if((roll100 <= eml && roll100 <= 95) || roll100 <= 5)
        {   
            success = "Success!";
            if(div5 != Math.round(div5))
            {
                pref = "{{ms=";
            }
        }
  
        newChat = newChat + "&{template:harn} {{" + args[3].toLowerCase() + "=" + args[4] + "}} {{roll=" + roll100 + "}} {{eml=" + eml + "}} " + pref + critical + success + suff;

        var player = "/w " + msg.who + " " + newChat;
   
        var master = "/w GM " + newChat;
        sendChat(msg.who, master);
        if(msg.who.indexOf("(GM)") < 0)
            sendChat(msg.who, player);
      
    }
    else if(msg_orig.type == "api" && msg_orig.content.indexOf("!GMEML") >= 0)
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
        var si = Math.round(eml/10);
        var roll100 = parseInt(args[2]);
        var div5 = roll100/5;
        var critical = "Moderate ";
        var success = "Failure!"
        var newChat = "/w GM ";
        var pref = "{{mf=";
        var suff = "}}";
        if(div5 == Math.round(div5) || roll100 <= 5)
        {
            critical = "Critical ";
            if((roll100 <= eml && roll100 <= 95))
            {
                pref = "{{cs=";
            }
            else
            {
                pref = "{{cf=";
            }
        }
        if((roll100 <= eml && roll100 <= 95) || roll100 <= 5)
        {   
            success = "Success!";
            if(div5 != Math.round(div5) && roll100 > si)
            {
                pref = "{{ms=";
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
        var article = "a";
        var endcheck = " Check";
        if(args[4].toLowerCase().indexOf("a") == 0 || args[4].toLowerCase().indexOf("e") == 0 || args[4].toLowerCase().indexOf("i") == 0 || args[4].toLowerCase().indexOf("o") == 0 || args[4].toLowerCase().indexOf("u") == 0) {
            article +="n";
        }
        if(args[4].toLowerCase().indexOf("check") >= 0){
            endcheck = "";
        }
        allToSee = "/e makes " + article + " " + args[4] + endcheck;
        //newChat = newChat.replace("Attacks With a ", "{{weapon=");
        //newChat = newChat.replace(" using the ", "}}");
        //newChat = newChat.replace(" skill ", "}}");
        //newChat = newChat.replace(" !EML", "/direct EML");
        //log(newChat);
        sendChat(msg.who, allToSee);
        sendChat(msg.who, newChat);
      
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
    log("WQ: "+wq);
    roll = randomInteger(6) + randomInteger(6) + randomInteger(6);
    if(wq >= roll)
        {return (cname + "'s " + wName + " withstands the strike!");}
    else
        {return (cname + "'s " + wName + " BREAKS!");}
}