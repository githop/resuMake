function doGet() {
  var html = HtmlService.createTemplateFromFile('page').evaluate()
      .setSandboxMode(HtmlService.SandboxMode.NATIVE)
      .setTitle('ResuMake Test');
  return html
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function processForm(form) {  
  var formInput = {
    firstName:   form.canFirst,
    lastName:    form.canLast,
    sizzle:      form.sizzle,
    clinDoc:     form.clinDoc,
    stork:       form.stork,
    beacon:      form.beacon,
    anesthesia:  form.anesthesia,
    empName:     form.empName,
    empYears:    form.empYears,
    description: form.description,
    school:      form.school,
    eduYears:    form.eduYears,
    degree:      form.degree
  };
  
  var certs = [formInput.clinDoc, formInput.stork, formInput.beacon, formInput.anesthesia];
  var empHist = [formInput.empName, formInput.empYears, formInput.description];
  
  var gDoc   = DocumentApp.create("Resume for: " + formInput.firstName + " " + formInput.lastName);
  var doc    = gDoc.getBody();
  var img    = UrlFetchApp.fetch('http://i.imgur.com/s6wnamr.jpg');
  
  var title  = {};
  var h1     = {};
  var plain  = {};
  
  title[DocumentApp.Attribute.FONT_SIZE]   = 21;
  
  h1[DocumentApp.Attribute.FONT_SIZE]      = 16; 
 
  plain[DocumentApp.Attribute.FONT_SIZE]   = 11;
  

  //Logo
  doc.setMarginTop(25).appendImage(img).setHeight(50).setWidth(150); 
  
  doc.appendParagraph(formInput.firstName + " " + formInput.lastName)
     .setAlignment(DocumentApp.HorizontalAlignment.CENTER).setAttributes(title);
  
  //Candidate Name
  doc.appendParagraph("Candidate Summary").setAttributes(h1);
  
  //Sizzle
  doc.appendParagraph(formInput.sizzle).setAttributes(plain);
  
  //Epic Certs
  doc.appendParagraph("Epic Certifications").setAttributes(h1); 
 
  for (var i = 0; i < certs.length; i++) {
    if (certs[i] != null) {
      var listItem = doc.appendListItem(certs[i]).setGlyphType(DocumentApp.GlyphType.BULLET).setAttributes(plain);
    }
  }
  
  doc.appendParagraph("Employment History").setAttributes(h1);
  
 
  for (var e = 0; e  <= empHist.length + 1; e++) {
    doc.appendTable([[empHist[0][e], empHist[1][e]]]).setAttributes(h1)
       .setBorderWidth(0);
    doc.appendParagraph(empHist[2][e]).setAttributes(plain);
  }
  
 doc.appendParagraph(formInput.school + " " + formInput.eduYears).setAttributes(h1);
 doc.appendParagraph(formInput.degree).setAttributes(h1);
  
}
