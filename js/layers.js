addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("p", 21)) gain = gain.times(2)
        if(hasUpgrade("p", 22)) gain = gain.times(3)
        if(hasUpgrade("p", 23)) gain = gain.times(3)
        if(hasUpgrade("p", 24)) gain = gain.times(9)
        if(hasUpgrade("p", 25)) gain = gain.times(9)
        if(hasUpgrade("e", 12)) gain = gain.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
                  rows: 2,
                 cols: 5,
                 11: {
                        description: "x2 points"
                        ,cost: nodeShown(1)
                 }
                 ,12: {
                        description: "x2 points"
                        ,cost: nodeShown(1)        
                        }
                 ,13: {
                        description: "x3 points"
                        ,cost: nodeShown(3)       
                 }
                 ,14: {
                        description: "x3 points"
                        ,cost: nodeShown(7)
                 }
                 ,15: {
                        description: "x4 points"
                        ,cost: nodeShown(15)
                 }
                 ,21: {
                        description: "x2 prestige"
                        ,cost: nodeShown(35)
                        ,unlocked() {return hasUpgrade("p", 15)}
                 
                } 
                ,22:  {
                        description:  "x3 prestige"
                        ,cost: nodeShown(70)
                        ,unlocked() {return hasUpgrade("p", 21)}
                }
                ,23:  {
                        description: "x3 prestige"
                        ,cost: nodeShown(210)
                        ,unlocked() {return hasUpgrade("p", 22)}
                }
                ,24:  {
                        description: "x9 prestige"
                        ,cost: nodeShown(600)
                        ,unlocked() {return hasUpgrade("p", 23)}
                }
                ,25:  {
                        description: "x9 prestige. Unlock a layer."
                        ,cost: nodeShown(6000)
                        ,unlocked() {return hasUpgrade("p", 24)}
                }
            } 
        }
)
addlayer("e", {
    name: "Elementary Students",
    symbol: "E",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#F5ED05"
    ,requires: new Decimal(7e4)
    ,exponent: 0.25
    ,baseResource: "prestige"
    ,upgrades:  {
                rows:1
                ,cols:2
                ,11:{
                    description:"x5 points"
                    ,cost:nodeShown(1)
                }
                ,12:{
                    description:"x3 prestige"
                    ,cost:nodeShown(1)
                }
    }

        }
)