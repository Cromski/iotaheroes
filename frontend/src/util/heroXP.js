import nerdamer from "nerdamer/all.js";

export const getLevelProgress = (xp) => {
    var e = nerdamer.solveEquations("x^2.5+9="+xp+"", "x");
    var curLvl = Math.round(e[0]*100)/100 //.text('decimals',2);
    // var exp = new algebra.parse("x^2.51 + 9");
    //xp=1*(power(X,2.51))+9

    return {
        totalxp:xp,
        currentLevel:curLvl,
        progressTowardsLevel: 60};
}