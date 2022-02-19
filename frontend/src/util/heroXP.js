import nerdamer from "nerdamer/all.js";

export const getLevelProgress = (xp) => {
    var e = nerdamer.solveEquations("x^2.5+9="+xp+"", "x");
    var curLvl = Math.round(e[0]*100)/100 //.text('decimals',2);
    var floorLvl = Math.floor(e[0]);
    var ceilLvl = floorLvl+1;
    var floorLvlXpEq = nerdamer.solveEquations(floorLvl+"^2.5+9=x","x")
    var ceilLvlXpEq = nerdamer.solveEquations(ceilLvl+"^2.5+9=x","x")
    var floorLvlXp =Math.round(floorLvlXpEq[0]*100)/100;
    var ceilLvlXp = Math.round(ceilLvlXpEq[0]*100)/100;
    console.log("Current lvl", curLvl);
    console.log("Floored lvl", floorLvl);
    console.log("Floored lvl Exp", floorLvlXp);
    console.log("Ceil lvl", ceilLvl)
    console.log("Ceil lvl Exp", ceilLvlXp);
    var xpMissing = ceilLvlXp-Number(xp);
    var xpInLevel = xp-floorLvlXp;
    var xpRequiredForNextLevel = ceilLvlXp - floorLvlXp;
    var xpProgress = Math.floor((xpInLevel/xpRequiredForNextLevel)*100);
    console.log("xpMissing", xpMissing);
    console.log("xpInLevel", xpInLevel)
    console.log("xp required for next level", xpRequiredForNextLevel)
    console.log("xp progress:", xpProgress)


    return {
        totalxp:xp,
        currentLevel:floorLvl,
        progressTowardsLevel: xpProgress};
}