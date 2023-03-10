class Button {
    constructor(btn) {
        this._label = { FR: '', AR: '', EN: '' };
        this._retrieved = false;
        this._btnID = btn.btnID;
        this._label = btn.label;
        this._rootID = btn.rootID;
        this._parentBtn = btn.parentBtn;
        this._children = btn.children;
        this._prayers = btn.prayers;
        this._retrieved = btn.retrieved;
        this._prayersArray = btn.prayersArray;
        this._titlesArray = btn.titlesArray;
        this._languages = btn.languages;
        this._onClick = btn.onClick;
        this._value = btn.value;
        btn.cssClass ? this._cssClass = btn.cssClass : this._cssClass = 'sideBarBtn';
        this._inlineBtns = btn.inlineBtns;
    }
    ;
    get btnID() { return this._btnID; }
    ;
    get children() { return this._children; }
    ;
    get prayers() { return this._prayers; }
    ;
    get retrieved() { return this._retrieved; }
    ;
    get prayersArray() { return this._prayersArray; }
    ;
    get titlesArray() { return this._titlesArray; }
    ;
    get languages() { return this._languages; }
    ;
    get label() { return this._label; }
    ;
    get parentBtn() { return this._parentBtn; }
    ;
    get rootID() { return this._rootID; }
    ;
    get onClick() { return this._onClick; }
    ;
    get value() { return this._value; }
    ;
    get cssClass() { return this._cssClass; }
    ;
    get inlineBtns() { return this._inlineBtns; }
    ;
    set btnID(id) { this._btnID = id; }
    ;
    set label(lbl) { this._label = lbl; }
    ;
    set parentBtn(parentBtn) { this._parentBtn = parentBtn; }
    ;
    set prayers(btnPrayers) { this._prayers = btnPrayers; }
    ;
    set retrieved(retrieved) { this._retrieved = retrieved; }
    ;
    set prayersArray(btnPrayersArray) { this._prayersArray = btnPrayersArray; }
    ;
    set titlesArray(titles) { this._titlesArray = titles; }
    ;
    set languages(btnLanguages) { this._languages = btnLanguages; }
    ;
    set onClick(fun) { this._onClick = fun; }
    ;
    set children(children) { this._children = children; }
    ;
    set cssClass(cssClass) { this._cssClass = cssClass; }
    ;
    set inlineBtns(btns) { this._inlineBtns = btns; }
}
;
class inlineButton extends Button {
    constructor(btn) {
        super(btn);
        this.cssClass = 'inlineBtn';
    }
    ;
}
;
const btnMain = new Button({
    btnID: 'btnMain',
    label: { AR: "???????????? ?????? ?????????????? ????????????????", FR: "Retour au menu principal", EN: "Back to the main menu" },
});
const btnGoBack = new Button({
    btnID: 'btnGoBack',
    label: { AR: "????????????", FR: "Retour", EN: "Go Back" },
});
const btnMass = new Button({
    btnID: 'btnMass',
    label: { AR: "????????????????", FR: "Messes" },
});
const btnIncenseOffice = new Button({
    btnID: 'btnIncenseOffice',
    label: {
        AR: "?????? ???????? ???????? ???? ????????",
        FR: "Office des Encens Aube et Soir"
    },
    onClick: () => {
        //show or hide the PropheciesDawn button if we are in the Great Lent or JonahFast:
        if (Season == Seasons.GreatLent || Season == Seasons.JonahFast) {
            if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) == -1
                && todayDate.getDay() != 0 //i.e., we are not a Sunday
                && todayDate.getDay() != 6 //i.e., we are not a Saturday
            ) {
                //it means btnReadingsPropheciesDawn does not appear in the Day Readings buttons list (i.e., =-1), and we are neither a Saturday or a Sunday, which means that there are prophecies lectures for these days and we need to add the button in all the Day Readings Menu, and the Incense Dawn
                btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                btnDayReadings.children.splice(1, 0, btnReadingsPropheciesDawn);
                //btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                //btnDayReadings.children.unshift(btnReadingsPropheciesDawn);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) > -1
                && (todayDate.getDay() == 0 //i.e., we are a Sunday
                    || todayDate.getDay() == 6 //i.e., we are a Saturday
                )) {
                //it means btnReadingsPropheciesDawn appears in the Day Readings buttons list, and we are either a Saturday or a Sunday, which means that there are no prophecies for these days and we need to remove the button from all the menus to which it had been added before
                btnIncenseDawn.children.splice(btnIncenseDawn.children.indexOf(btnReadingsPropheciesDawn), 1);
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsPropheciesDawn), 1);
            }
            if (btnDayReadings.children.indexOf(btnReadingsGospelNight) == -1 &&
                todayDate.getDay() == 0 //we are a Sunday
            ) {
                // it means that we are a Sunday. We add the Gospel Night button to the Day Readings menu (we do not add it to the Unbaptized mass menu because it is not read during the mass)
                btnDayReadings.children.push(btnReadingsGospelNight);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsGospelNight) > -1 &&
                todayDate.getDay() != 0 //we are not a Sunday
            ) {
                //it means we are not a Sunday, which means that if the Night Gospel button appears in the Day Readings menu, we need to remove it
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsGospelNight));
            }
            ;
            //removing the vespers prayers if we are not a Saturday, and adding it if we aree
            if (todayDate.getDay() != 6 && btnDayReadings.children.indexOf(btnIncenseVespers) > -1) {
                //it means we are not a Saturday. we need to remove the btnIncenseVespers because there are not vespers
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnIncenseVespers), 1);
            }
            else if (todayDate.getDay() == 6 && btnDayReadings.children.indexOf(btnIncenseVespers) == -1) {
                //it means we are  a Saturday. we need to add the btnReadingsGospelIncenseVespers if missing
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsGospelIncenseDawn), 0, btnIncenseVespers);
            }
        }
        ;
    }
});
const btnIncenseDawn = new Button({
    btnID: 'btnIncenseDawn',
    label: {
        AR: '???????? ????????',
        FR: 'Encens Aube'
    },
    prayersArray: PrayersArray,
    languages: prayersLanguages,
    onClick: () => {
        //we will first set the prayers of the Incense Dawn button
        btnIncenseDawn.prayers = [...IncensePrayers];
        //removing the non-relevant Cymbal prayers according to the day of the week: Wates/Adam
        if (todayDate.getDay() > 2) {
            //we are between Wednesday and Saturday, we keep only the "Wates" Cymbal prayers
            btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf("PrayerCymbalVersesAdamDate=0000"), 1);
        }
        else {
            //we are Sunday, Monday, or Tuesday. We keep only the "Adam" Cymbal prayers
            btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf("PrayerCymbalVersesWatesDate=0000"), 1);
        }
        ;
        //removing the Departed Litany from IncenseDawn prayers
        btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf('PrayerDepartedPrayerPart1Date=0000'), 5);
        //removing the Wates Vespers' Doxology for St. Mary
        btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf('PrayerDoxologyVespersWatesStMary'), 1);
        //Adding an inline Button for showing the "Adam" Doxologies, and removing the id of the Adam Doxologies from the btn.prayers array
        if (!btnIncenseDawn.inlineBtns) {
            btnIncenseDawn.inlineBtns = [];
        }
        ;
        //if btnIncenseDawn has no inlineBtns, we add an inlineBtn for the 'DoxologiesAdam' prayers
        if (btnIncenseDawn.inlineBtns.length == 0) {
            let btn = new inlineButton({
                btnID: 'AdamDoxologies',
                label: {
                    AR: '???????????????????? ???????? ????????',
                    FR: 'Doxologies Adam Aube'
                },
            });
            btnIncenseDawn.inlineBtns.push(btn);
            //We also add a GoBackButton as an inlineBtn to btn
            if (!btn.inlineBtns) {
                btn.inlineBtns = [];
                btn.inlineBtns.push(new inlineButton({
                    btnID: btnGoBack.btnID,
                    label: btnGoBack.label,
                    onClick: () => showChildButtonsOrPrayers(btnIncenseDawn, true, false)
                }));
                //when the GoBack html element will be created, an 'onclick' eventListner will be attached to it (Please NOTE that the eventListner WILL NOT be attached unless the button has either its 'prayers' or 'children' or 'onClick' properties set).This eventListner passes the GoBack button to the showChildButtonsOrPrayers() function. When passed to showChildButtonsOrPrayers(), the onClick function will be called. We set the onClick property of the GoBack Button to a function that, at its turn, passes the btnIncenseDawn button to the showChildButtonsOrPrayers() function. Notice that we set the 'click' parameter to 'false' in order to avoid calling the onClick property of btnIncenseDawn when passing it to the showChildButtonsOrPrayers(), because we just want it to show its 'prayers'  and its 'inlineButton' (i.e. the DoxologiesAdam inlineButton) as those properties were set before clicking the DoxologiesAdam inlineButton.
            }
            ;
            if (!btn.prayers) {
                btn.prayers = [];
                btn.prayersArray = btnIncenseDawn.prayersArray; //we need it because the prayers are not shown unless the button has the prayersArray and the Languages properties set
                btn.languages = btnIncenseDawn.languages;
                btnIncenseDawn.prayers.map(prayer => {
                    if (prayer.includes('DoxologyAdam')) {
                        //add the id of the prayer to the prayers of the inline button that we created
                        btn.prayers.push(prayer);
                    }
                });
            }
            ;
            //then removing the prayer id from the btnIncenseDawn.prayers array in order to exclude them unless requested by the user by clicking on the inline button
            btn.prayers.map(p => btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf(p, 1)));
        }
        ;
        // We will add the Gospel readings to the prayers
        let index;
        index = btnIncenseDawn.prayers.indexOf('PrayerGospelIntroductionPart3Date=0000' + 1);
        let gospel = setGospelPrayers('IncenseDawn'); //we get the gospel prayers array for the Incense Dawn office
        insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, gospel.splice(0, 1)); //we remove the 'Psalm response' ;
        index = btnIncenseDawn.prayers.indexOf('PrayerGospelPrayerPart2Date=0000' + 1); //this is the end of the Gospel Prayer
        insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, [gospel[0]]); //we insert the 'Psalm response' ;
        //We remove "Eklonomin Taghonata" from the prayers array
        btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf('PrayerGodHaveMercyOnUsRefrainCommentSeason=GreatLent'), 1); //this is the comment
        for (let i = 1; i < 6; i++) {
            btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf('PrayerGodHaveMercyOnUsRefrainSeason=GreatLent'), 1);
        }
        ;
        for (let i = 1; i < 16; i++) {
            btnIncenseDawn.prayers.splice(btnIncenseDawn.prayers.indexOf('PrayerGodHaveMercyOnUsPart' + i.toString() + 'Season=GreatLent'), 2); // we remove 2 because there is Kirielyson after each part
        }
        ;
        //We will then add other prayers according to the occasion
        if (Season == Seasons.GreatLent) {
            //we will add the 'Eklonomin Taghonata' prayer to the Dawn Incense Office prayers, after the 'Efnoti Naynan' prayer
            index = btnIncenseDawn.prayers.indexOf('PrayerEfnotiNaynanPart4Date=0000') + 2;
            let temp = [];
            //we add the comment
            temp.push('PrayerGodHaveMercyOnUsRefrainCommentDate=GreatLent');
            let prayer = ['PrayerGodHaveMercyOnUsRefrainSeason=GreatLent', 'PrayerKyrieEliesonDate=0000',
                'PrayerKyrieEliesonThreeTimesWithoutAmenDate=0000'];
            let id = ['PrayerGodHaveMercyOnUsPart', 'Season=GreatLent'];
            let kyrielson = prayer[1], lastKyrie;
            //then we add the refraint + each set of 3 prayers
            for (let i = 1; i < 14; i += 3) {
                i + 2 == 15 ? lastKyrie = prayer[2] : lastKyrie = kyrielson;
                temp.push(prayer[0], id[0] + i.toString() + id[1], kyrielson, id[0] + (i + 1).toString() + id[1], kyrielson, id[0] + (i + 2).toString() + id[1], lastKyrie);
            }
            ;
            insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, temp);
            //We will then add the GreatLent Doxologies to the Doxologies before the first Doxology of St. Mary
            index = btnIncenseDawn.prayers.indexOf('PrayerDoxologyArchangelMichaelWatesDate=0000') - 1;
            if (todayDate.getDay() != (0 || 6)) {
                insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, ['PrayerDoxology1Date=GreatLentWeek', 'PrayerDoxology2Date=GreatLentWeek', 'PrayerDoxology3Date=GreatLentWeek', 'PrayerDoxology4Date=GreatLentWeek', 'PrayerDoxology5Date=GreatLentWeek']);
            }
            else if (todayDate.getDay() == (0 || 6)) {
                insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, ['PrayerDoxology1Date=GreatLentSundays']);
            }
            ;
        }
        else if (Number(copticMonth) == 4) {
            index = btnIncenseDawn.prayers.indexOf('PrayerDoxologyStMaryDate=0000') - 1;
            insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, ['PrayerDoxology1Date=0004', 'PrayerDoxology2Date=0004', 'PrayerDoxology3Date=0004', 'PrayerDoxology4Date=0004',
                'PrayerDoxology5Date=0004',
                'PrayerDoxology6Date=0004']);
        }
        else if (Season == Seasons.Resurrection) {
            insertPrayerIntoArrayOfPrayers(btnIncenseDawn.prayers, index, ['']);
        }
        ;
    }
});
const btnIncenseVespers = new Button({
    btnID: 'btnIncenseVespers',
    label: {
        AR: "???????? ????????",
        FR: 'Incense Vespers'
    },
    prayersArray: PrayersArray,
    languages: prayersLanguages,
    onClick: () => {
        btnIncenseVespers.prayers = [...IncensePrayers];
        //removing the Travelers Litany from IncenseVespers prayers
        btnIncenseVespers.prayers.splice(btnIncenseVespers.prayers.indexOf('PrayerTravelersPrayerPart1Date=0000'), 5);
        //removing the Oblations Litany from IncenseVespers paryers
        btnIncenseVespers.prayers.splice(btnIncenseVespers.prayers.indexOf('PrayerOblationsPrayerPart1Date=0000'), 5);
        //removing the Dawn Doxology for St. Mary
        btnIncenseVespers.prayers.splice(btnIncenseVespers.prayers.indexOf('PrayerDoxologyDawnWatesStMary'), 1);
        //removing the non-relevant Cymbal prayers according to the day of the week: Wates/Adam
        if (todayDate.getDay() > 2) {
            //we are between Wednesday and Saturday, we keep only the "Wates" Cymbal prayers
            btnIncenseVespers.prayers.splice(btnIncenseVespers.prayers.indexOf("PrayerCymbalVersesAdamDate=0000"), 1);
        }
        else {
            //we are Sunday, Monday, or Tuesday. We keep only the "Adam" Cymbal prayers
            btnIncenseVespers.prayers.splice(btnIncenseVespers.prayers.indexOf("PrayerCymbalVersesWatesDate=0000"), 1);
        }
        ;
    }
});
const btnMassStCyril = new Button({
    btnID: 'btnMassStCyril',
    label: { AR: "????????????", FR: "Messe Saint Cyril", EN: "St Cyril Mass" },
    prayers: [...MassPrayers.MassCommonIntro, ...MassPrayers.MassStCyril, ...MassPrayers.MassFractions, ...MassPrayers.Communion],
    prayersArray: PrayersArray,
    languages: prayersLanguages,
    onClick: () => {
        // adding inline buttons if they were not already set when the user previously clicked the button
        if (!btnMassStCyril.inlineBtns) {
            btnMassStCyril.inlineBtns = [...goToAnotherMass];
            btnMassStCyril.inlineBtns.splice(2, 1); //removing btnGoToStCyrilReconciliation from the inlineBtns
        }
        ;
        //we will retrieve the prayers from the prayersArray and set the retrieved property to true
        if (!btnMassStCyril.retrieved) {
            btnMassStCyril.prayersArray = retrieveBtnPrayers(btnMassStCyril);
        }
        ;
    }
});
const btnMassStGregory = new Button({
    btnID: 'btnMassStGregory',
    label: { AR: "??????????????", FR: "Saint Gregory" },
    prayers: [...MassPrayers.MassCommonIntro, ...MassPrayers.MassStGregory, ...MassPrayers.MassCallOfHolySpirit, ...MassPrayers.MassLitanies, ...MassPrayers.MassFractions, ...MassPrayers.Communion],
    prayersArray: PrayersArray,
    languages: prayersLanguages,
    onClick: () => {
        // adding inline buttons if they were not already set when the user previously clicked the button
        if (!btnMassStGregory.inlineBtns) {
            btnMassStGregory.inlineBtns = [...goToAnotherMass];
            btnMassStGregory.inlineBtns.splice(1, 1); //removing btnGoToStGregoryReconciliation from the inlineBtns
        }
        ;
    }
});
const btnMassStBasil = new Button({
    btnID: 'btnMassStBasil',
    label: { AR: '????????????', FR: 'Messe Saint Basil', EN: 'St Basil Mass' },
    prayers: [...MassPrayers.MassCommonIntro, ...MassPrayers.MassStBasil, ...MassPrayers.MassCallOfHolySpirit, ...MassPrayers.MassLitanies, ...MassPrayers.MassFractions, ...MassPrayers.Communion],
    prayersArray: PrayersArray,
    languages: prayersLanguages,
    onClick: () => {
        // adding inline buttons if they were not already set when the user previously clicked the button
        if (!btnMassStBasil.inlineBtns) {
            btnMassStBasil.inlineBtns = [...goToAnotherMass];
            btnMassStBasil.inlineBtns.splice(0, 1); //removing btnGoToStBasilReconciliation from the inlineBtns
        }
        ;
    }
});
const btnMassStJohn = new Button({
    btnID: 'btnMassStJohn',
    label: { AR: '???????????? ??????????', FR: 'Saint Jean' },
    prayers: [],
    onClick: () => {
        // adding inline buttons if they were not already set when the user previously clicked the button
        if (!btnMassStJohn.inlineBtns) {
            btnMassStJohn.inlineBtns = [...goToAnotherMass];
            btnMassStJohn.inlineBtns.splice(3, 1); //removing btnGoToStJohnReconciliation from the inlineBtns
        }
        ;
        if (!btnMassStJohn.retrieved) {
            btnMassStJohn.prayersArray = retrieveBtnPrayers(btnMassStJohn);
        }
        ;
    }
});
/**
 * This function takes a Button or an inlineButton, and looks in the button's array of prayers text (i.e. btn.prayersArray) if there is a prayer having the same id as the id of each prayer in the btn.prayers array
 * @param {Button || inlineButton} btn - a button having its btn.prayers && btn.prayersArray set (i.e. not undefined)
 * @returns {string[][]} - an array of prayers text, each prayer is an array starting with the prayer id, the text in a given language, text in another languages, etc.,
 */
function retrieveBtnPrayers(btn) {
    if (btn.prayers && btn.prayersArray) {
        let retrieved = [];
        btn.prayers.map(p => {
            retrieved = [...retrieved, ...retrieveButtonPrayersFromItsPrayersArray(btn, p)];
        });
        btn.retrieved = true;
        return retrieved;
    }
    else {
        console.log('the ' + btn.btnID + ' does not have its prayers or prayersArray set', 'prayers = ', btn.prayers, 'prayersArray = ', btn.prayersArray);
    }
}
;
const goToAnotherMass = [
    new inlineButton({
        btnID: 'btnGoToStBasilReconciliation',
        label: { AR: '???????? ?????????? ????????????????', FR: 'Reconciliation Saint Basil' },
        onClick: () => {
            showChildButtonsOrPrayers(btnMassStBasil);
        }
    }),
    new inlineButton({
        btnID: 'btnGoToStGregoryReconciliation',
        label: { AR: '???????? ?????????? ??????????????????', FR: 'Reconciliation Saint Gregory' },
        onClick: () => {
            showChildButtonsOrPrayers(btnMassStGregory);
        }
    }),
    new inlineButton({
        btnID: 'btnGoToStCyrilReconciliation',
        label: { AR: '???????? ?????????? ????????????????', FR: 'Reconciliation Saint Cyril' },
        onClick: () => {
            showChildButtonsOrPrayers(btnMassStCyril);
        }
    }),
    new inlineButton({
        btnID: 'btnGoToStJeanReconciliation',
        label: { AR: '???????? ?????????? ???????????? ??????????', FR: 'Reconciliation Saint Jean' }, rootID: 'StJohn',
        parentBtn: btnMass,
        onClick: () => {
            showChildButtonsOrPrayers(btnMassStJohn);
        }
    })
];
const btnMassOfferingOfTheLamb = new Button({
    btnID: 'btnMassOfferingOfTheLamb',
    label: { AR: '?????????? ??????????', FR: "Pr??sentation de l'Agneau" }
});
const btnMassRoshoumat = new Button({
    btnID: 'btnMassRoshoumat',
    label: { AR: '???????????? ??????????', FR: "Roshoumat El Hamal" }
});
const btnMassUnBaptised = new Button({
    btnID: 'btnMassUnBaptised',
    label: { AR: '???????? ??????????????????', FR: 'Messe des non baptis??s', EN: 'Unbaptised Mass' }
});
const btnMassBaptised = new Button({
    btnID: 'btnMassBaptised',
    label: {
        AR: '???????? ????????????????',
        FR: 'Messe des Croyants',
        EN: 'Baptized Mass'
    },
    parentBtn: btnMass,
    children: [btnMassStBasil, btnMassStCyril, btnMassStGregory, btnMassStJohn]
});
const btnFractionPrayers = new Button({
    btnID: 'btnFractionPrayers',
    label: { AR: '?????????? ????????????', FR: 'Fraction' }
});
const btnMassReadings = new Button({
    btnID: 'btnMassReadings',
    label: {
        AR: '????????????????',
        FR: 'Lectures'
    },
    prayers: [Readings.StPaul, Readings.Katholikon, Readings.Praxis, Readings.Synaxarium, Readings.GospelMass],
});
const btnDayReadings = new Button({
    btnID: 'btnDayReadings',
    label: { AR: "???????????? ??????????", FR: "Lectures du jour", EN: 'Day\'s Readings' },
    onClick: btnIncenseOffice.onClick
});
const btnReadingsStPaul = new Button({
    btnID: 'btnReadingsStPaul',
    label: {
        AR: '????????????',
        FR: 'Ep??tre de Saint Paul',
        EN: 'Pauline Epistle'
    },
    prayers: [Readings.StPaul],
    prayersArray: StPaulArray,
    languages: readingsLanguages
});
const btnReadingsKatholikon = new Button({
    btnID: 'btnReadingsKatholikon',
    label: {
        AR: '??????????????????????',
        FR: 'Katholikon'
    },
    prayers: [Readings.Katholikon],
    prayersArray: KatholikonArray,
    languages: readingsLanguages
});
const btnReadingsPraxis = new Button({
    btnID: 'btnReadingsPraxis',
    label: {
        AR: '??????????????????',
        FR: 'Praxis'
    },
    prayers: [Readings.Praxis],
    prayersArray: PraxisArray,
    languages: readingsLanguages
});
const btnReadingsSynaxarium = new Button({
    btnID: 'btnReadingsSynaxarium',
    label: {
        AR: '????????????????',
        FR: 'Synaxarium'
    },
    prayers: [Readings.Synaxarium],
    prayersArray: SynaxariumArray,
    languages: readingsLanguages
});
const btnReadingsGospelMass = new Button({
    btnID: 'btnReadingsGospelMass',
    label: {
        AR: '?????????? ????????????',
        FR: 'l\'Evangile',
        EN: 'Gospel'
    },
    prayers: setGospelPrayers('Mass'),
    prayersArray: GospelMassArray,
    languages: readingsLanguages,
});
const btnReadingsGospelIncenseVespers = new Button({
    btnID: 'btnReadingsGospelIncenseVespers',
    label: {
        AR: '?????????? ????????',
        FR: 'Evangile  V??pres',
        EN: 'Vespers Gospel'
    },
    prayers: setGospelPrayers('IncenseVespers'),
    prayersArray: GospelVespersArray,
    languages: readingsLanguages,
    onClick: () => {
        //we will first store the value of Season because it might be changed during the following process
        let currentSeason = Season;
        // we will retrieve the vespers prayers by the date of the next day (i.e., if we are a Saturday, we will retrieve the gospel according to the date of Sunday not the date of Saturday itself). Thi is because the ppt slides were setting the date of the vespers gospel according the the next day
        let readingDate = 'Date=' + setSeasonAndCopticReadingsDate(convertGregorianDateToCopticDate(new Date(todayDate.getTime() + calendarDay)));
        //adding the date to the psalm
        btnReadingsGospelIncenseVespers.prayers[1] += readingDate;
        //adding the date to the gospel
        btnReadingsGospelIncenseVespers.prayers[2] += readingDate;
        //we then reset the Season because it was potentially modified when calling setSeasonAndCopticReadingsDate()
        Season = currentSeason;
    }
});
const btnReadingsGospelIncenseDawn = new Button({
    btnID: 'btnReadingsGospelIncenseDawn',
    label: {
        AR: '?????????? ????????',
        FR: 'Evangile Aube',
        EN: 'Gospel Dawn'
    },
    prayers: setGospelPrayers('IncenseDawn'),
    prayersArray: GospelDawnArray,
    languages: readingsLanguages,
});
const btnReadingsGospelNight = new Button({
    btnID: 'btnReadingsGospelNight',
    label: {
        AR: '?????????? ????????????',
        FR: 'Evangile Soir',
        EN: 'Vespers Gospel'
    },
    prayers: setGospelPrayers('Night'),
    parentBtn: btnIncenseVespers,
    prayersArray: GospelNightArray,
    languages: readingsLanguages,
});
const btnReadingsPropheciesDawn = new Button({
    btnID: 'btnReadingsPropheciesDawn',
    label: {
        AR: "?????????? ????????",
        FR: 'Propheties Matin'
    },
    parentBtn: btnIncenseDawn,
    prayers: [Readings.PropheciesDawn],
    prayersArray: PropheciesDawnArray,
    languages: readingsLanguages
});
const btnHeteneyat = new Button({
    btnID: 'btnHeteneyat',
    label: { AR: '??????????????????', FR: 'Heteneyat' }
});
const btnPraxisResponse = new Button({
    btnID: 'btnPraxisResponse',
    label: { AR: '?????? ??????????????????', FR: 'R??ponse Praxis' }
});
const btnMassGospelResponse = new Button({
    btnID: 'btnMassGospelResponse',
    label: { AR: '?????? ??????????????', FR: 'R??ponse Evangile' }
});
const btnMassReconciliation = new Button({
    btnID: 'btnMassReconciliation',
    label: {
        AR: '???????? ??????????',
        FR: 'Reconcilation'
    }
});
const btnMassAnaphora = new Button({
    btnID: 'btnMassAnaphora',
    label: { AR: '??????????????????', FR: 'Anaphora' }
});
const btnMassCommunion = new Button({
    btnID: 'btnMassCommunion',
    label: { AR: '??????????????', FR: 'Communion' }
});
btnMain.children = [btnMass, btnIncenseOffice, btnDayReadings];
btnMass.children = [btnIncenseDawn, btnMassOfferingOfTheLamb, btnMassRoshoumat, btnMassUnBaptised, btnMassBaptised];
btnMassUnBaptised.children = [btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsSynaxarium, btnReadingsGospelMass];
btnIncenseVespers.children = [btnReadingsGospelIncenseVespers];
btnIncenseDawn.children = [btnReadingsGospelIncenseDawn];
btnDayReadings.children = [btnReadingsGospelIncenseVespers, btnReadingsGospelIncenseDawn, btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsGospelMass];
btnIncenseOffice.children = [btnIncenseDawn, btnIncenseVespers];
/**
 * takes a liturgie name like "IncenseDawn" or "IncenseVespers" and replaces the word "Mass" in the buttons gospel readings prayers array by the name of the liturgie. It also sets the psalm and the gospel responses according to some sepcific occasions (e.g.: if we are the 29th day of a coptic month, etc.)
 * @param liturgie {string} - expressing the name of the liturigie that will replace the word "Mass" in the original gospel readings prayers array
 * @returns {string} - returns an array representing the sequence of the gospel reading prayers, i.e., an array like ['Psalm Response', 'Psalm', 'Gospel', 'Gospel Response']
 */
function setGospelPrayers(liturgie) {
    //this function sets the date or the season for the Psalm response and the gospel response
    // if (!todayDate) { var todayDate = new Date };
    let prayers = [...GospelPrayers], date;
    let psalm = prayers.indexOf('PrayerPsalmResponse'), gospel = prayers.indexOf('PrayerGospelResponse');
    //we replace the word 'Mass' in 'ReadingsGospelMass' by the liturige, e.g.: 'IncenseDawn'
    prayers[psalm + 1] = prayers[psalm + 1].replace('Mass', liturgie);
    prayers[psalm + 2] = prayers[psalm + 2].replace('Mass', liturgie);
    //setting the psalm and gospel responses
    if (Number(copticDay) == 29 && Number(copticMonth) != 4) {
        //we on the 29th of any coptic month except Kiahk (because the 29th of kiahk is the nativity feast)
        date = 'Date=2900';
        setResponse(psalm, date);
        setResponse(gospel, date);
    }
    else if (Number(copticMonth) == 4) {
        // we are during Kiahk month: the first 2 weeks have their own gospel response, and the second 2 weeks have another gospel response
        checkWhichSundayWeAre(Number(copticDay)) == '1stSunday' || '2ndSunday' ? date = 'Date=041stSunday' : date = 'Date=043rdSunday';
        setResponse(psalm, date);
    }
    else if (Season == Seasons.GreatLent) {
        //we are during the Great Lent period
        todayDate.getDay() == 0 || todayDate.getDay() == 6 ? date = 'Season=' + Season + 'Sundays' : date = 'Season=' + Season + 'Week';
        setResponse(gospel, date);
    }
    else if (Object.keys(copticFeasts).map(k => copticFeasts[k]).indexOf(copticDate) > -1 || //we check if copticDate = the value of any of the feasts dates in copticFeasts object
        [Seasons.JonahFast + '1', Seasons.JonahFast + '2', Seasons.JonahFast + '3', Seasons.JonahFast + '4'].indexOf(copticDate) > -1) //those are the 4 days of the Jonah fast
     {
        //if coptiDate equals one of the coptic feasts in the copticFeasts object, we set the psalm and gospel prayers to the copticDate
        date = 'Date=' + copticDate;
        setResponse(psalm, date);
        setResponse(gospel, date);
    }
    else if (Season == Seasons.NoSeason) {
        date = 'Date=0000';
        setResponse(psalm, date);
    }
    ;
    function setResponse(index, date) {
        prayers[index] = prayers[index] + date;
    }
    return prayers;
}
;
