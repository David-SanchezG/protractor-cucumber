class homePage {
  static dropdownLanguage = ()=>element(by.css("#lang-dropdown-select-language"));
  static frenchOption = ()=>element(by.css('[value="fr"]'));
  static destination = ()=>element(by.css("#destination_placeholder"));
  static listItemDestination = ()=>element(by.css(".autocompletelistitem"));
  static date_from = ()=>element(by.css("#checkin_date"));
  static date_to = ()=>element(by.css("#checkout_date"));
  static FEEL_LUCKY_TEXT = ()=>element(by.css("suerte"));
  static paxSelector = ()=>element(by.css('[data-modal-parent="modal-travelers"]'));
  static plusAdult = ()=>element(by.css('.group_per_room_0 [data-paxtype="pax"] [data-action="increase"]'));
  static plusInfant = ()=>element(by.css('.group_per_room_0 [data-paxtype="child"] [data-action="increase"]'));
  static btnShowResults = ()=>element(by.css('#show_results_small'));

  static visit() {
    cy.visit("/");
  }

  static getDate(date){
    return element.all(by.css(`[data-handler="selectDay"][data-month="${date.month()}"][data-year="${date.year()}"]`));
  }






  
}

exports.homePage = homePage;
