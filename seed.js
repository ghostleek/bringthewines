const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://bringthewines_prod:60SYJAzwtfhs5EwO@cluster0.dzdvfvo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema
const Wine = require('./models/wine.js'); // Path to the Wine model file

// Seed Data
const winesData = `
1997	Louis Jadot Latricières-Chambertin	400	NR
2004	Domaine François Gerbet Clos Vougeot	300	NR
2005	Domaine Bruno Clair Marsannay les Grasses Têtes	120	89.3
2006	Domaine Perrot-Minot Chambolle-Musigny 1er Cru La Combe d'Orveau Vieilles Vignes	450	93.3
2007	Domaine Bruno Clair Chambertin-Clos de Bèze	580	91.9
2010	Louis Jadot Echezeaux	320	93.5
2012	Domaine Rossignol Trapet Chapelle-Chambertin	300	92.6
2012	Domaine Robert Chevillon Nuits St. Georges 1er Cru Les Pruliers	180	92.2
2012	Domaine Heresztyn-Mazzini Gevrey-Chambertin Vieilles Vignes	105	90.8
2012	Emmanuel Rouget Côte de Nuits Villages	250	NR
2012	Domaine Robert Arnoux / Arnoux-Lachaux Vosne-Romanée 1er Cru Les Chaumes	680	90
2012	Pierre Damoy Chambertin	440	92.5
2013	Domaine Ghislaine Barthod / Barthod-Noëllat Chambolle-Musigny 1er Cru Les Véroilles	295	92
2013	Forey Père et Fils Vosne-Romanée 1er Cru Les Gaudichots	580	91
2014	Simon Bize Latricières-Chambertin	380	92.5
2014	Domaine Harmand-Geoffroy Mazis-Chambertin	325	93.3
2015	Arnaud Ente Bourgogne Rouge	150	92.3
2015	Domaine Patrice Rion Chambolle-Musigny Les Cras	150	92
2015	Domaine Marquis d'Angerville Volnay 1er Cru Clos des Ducs	400	93.2
2015	Alain Hudelot-Noëllat Vosne-Romanée	195	89.6
2016	Domaine Harmand-Geoffroy Gevrey-Chambertin 1er Cru La Bossiere	160	91
2016	Domaine Michel Gros Vosne-Romanée 1er Cru Clos des Réas	220	92.9
2016	Domaine Méo-Camuzet Vosne-Romanée	350	91
2016	Domaine Berthaut-Gerbet Bourgogne Les Prielles	65	88
2017	Domaine Duroché Gevrey-Chambertin en Champs	160	91.2
2017	Domaine Amiot-Servelle Chambolle-Musigny 1er Cru Derrière La Grange	270	91.4
2017	Domaine Duroché Gevrey-Chambertin 1er Cru Estournelles-St.-Jacques	420	NR
2017	Domaine Michel Lafarge Volnay 1er Cru Clos du Château des Ducs	340	93.8
2017	Domaine Bruno Clair Bonnes Mares	460	93.3
2017	Alain Hudelot-Noëllat Clos Vougeot	500	93.8
2017	Domaine Ghislaine Barthod Chambolle-Musigny 1er Cru Aux Beaux Bruns	305	92.8
2018	Domaine Duroché Gevrey-Chambertin Le Clos	140	89.9
2018	Domaine Duroché Gevrey-Chambertin Champ 	150	90.4
2018	Domaine Marc Roy Gevrey-Chambertin Cuvée Alexandrine	180	91
2018	Domaine Michel Lafarge Volnay 1er Cru Clos des Chênes	340	94
2018	Jean-Marc Millot Vosne-Romanée 1er Cru Les Suchots	255	93
2018	Domaine Berthaut-Gerbet Chambolle-Musigny 1er Cru Les Plantes	200	89
2019	Domaine Henri Naudin-Ferrand Bourgogne Hautes-Côtes de Beaune Orchis Mascula	110	90.1
2020	Domaine Henri Naudin-Ferrand Bourgogne Hautes-Côtes de Beaune Orchis Mascula	115
2020	Louis Jadot Chambolle-Musigny 1er Cru Les Amoureuses	650	96.5
2020	Domaine Gerard Peirazeau et Fils Bonnes Mares	390	NR`.trim().split('\n').map(line => {
    const [vintage, name, price, ctscore] = line.split('\t');
    let parsedCtscore = ctscore === 'NR' ? null : parseFloat(ctscore);
    if (isNaN(parsedCtscore)) {
        parsedCtscore = null; // If the parsed value is NaN, set it to null
    }
    return {
        name,
        price: parseFloat(price),
        description: `Burgundy red`,
        vintage: parseInt(vintage, 10),
        ctscore: parsedCtscore,
        type: 'Red',
    };
});

// Insert Data
Wine.insertMany(winesData)
    .then(() => {
        console.log('Data successfully inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting data: ', err);
        mongoose.connection.close();
    });