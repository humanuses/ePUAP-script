// ==UserScript==
// @name     Do druku
// @version  1
// @include   https://epuap.gov.pl/wps/myportal/aplikacje/skrzynka
// @grant    none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.4/pdfmake.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.4/vfs_fonts.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js

// ==/UserScript==
var cg;
  var button1 = document.createElement('button');
    button1.type = 'button';
    button1.innerHTML = 'RESET';
    button1.className = 'btn-styled';
 button1.style.background='red'
    button1.onclick = function() { //reset
      var links4=null;
      button2.innerHTML = 'DRUKUJ zebrane';
      localStorage.removeItem('linki');
      }
    
	    var button2 = document.createElement('button');
    button2.type = 'button';

if(localStorage.getItem('linki')!= null){var ilosc=localStorage.getItem('linki').split('\n');
    button2.innerHTML = 'DRUKUJ zebrane ('+(ilosc.length-1)+')';}else
    {button2.innerHTML = 'DRUKUJ zebrane';}
    button2.className = 'btn-styled';
 
    button2.onclick = function() { //druk plików
 
      localStorage.setItem('linki',links4)
      }
  var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Zbieranie numerów';
    button.className = 'btn-styled';

    button.onclick = function() {
      

   var   responseLink="https://epuap.gov.pl/warehouse/jsf/received.xhtml";
      fetch(responseLink)
.then(response=>response.text())
 
.then(data=>{
      const parser = new DOMParser();
const xmlDOM = parser.parseFromString(data,"text/html");
       var links =$("[id*='linkReceiver1']:contains('URZĄD')",xmlDOM);//              upp
     
        
        for (var i = 0; i < links.length; i++){
      console.log(links[i])
      var links2=$(links[i]).attr("href");
        console.log(links2);
       
           if (localStorage.getItem('linki')=== null){localStorage.setItem('linki',links2+"\n");}else{
         var links3= localStorage.getItem('linki')+links2+"\n";
                    localStorage.setItem('linki',links3);};}
        


var ilosc=localStorage.getItem('linki').split('\n');
    button2.innerHTML = 'DRUKUJ zebrane ('+(ilosc.length-1)+')';
     console.log(links.length);

        return links;
      });
      console.log(links);
     
    };
 function bam(links){
    console.log(links);

var zaw,zaw1,zaw2,zaw3
var zaw4="",nazwaPliku="";
var doc=document.body.innerHTML;

   var l= $(links).attr('href').split('=')
   
   var printLink=printLink+" https://epuap.gov.pl/warehouse/feDocContent?id="+l[1]+"&type=EPUAP_XML";
             console.log(printLink);
        }
		
		
button2.onclick =(async function drukowanie() {
  var links = localStorage.getItem('linki');

var sublinks=links.split('\n');
for(var z = 0; z < sublinks.length-1;z++){
  console.log(sublinks.length);
var zaw,zaw1,zaw2,zaw3;
var zaw4="",nazwaPliku="";
var doc=document.body.innerHTML;

   var l= sublinks[z].split('=');

                              console.log(l[1]);
   var printLink=" https://epuap.gov.pl/warehouse/feDocContent?id="+l[1]+"&type=EPUAP_XML";
  
  cg=0;
  
  await fetch(printLink)
.then(response=>response.text())

.then(data=>{

      const parser = new DOMParser();
const xmlDOM = parser.parseFromString(data,"text/xml");
  
 var zawx=$(xmlDOM.getElementsByClassName("body")).html();
     var zawx1=$(xmlDOM.getElementsByClassName("body")).text();

if(data.includes("SOVI"))
{
czestochowa(nazwaPliku,zawx,printLink);
}
else {katowice(nazwaPliku,zawx,printLink,nazwaPliku,l[1]);}
    
})
  cg=0;
}
})
function katowice(nazwaPliku,zawx,printLink,nazwaPliku,x){
 
var rep=/<br>/g;
	var zaw = $("p",zawx).eq( 0 ).html().replace(rep,'\n');// adres nadawcy
	var zaw1 = $("p",zawx).eq( 1 ).text().replace(/(\r\n|\n|\r)/gm, "").toString();//miejscowość data
	var zaw2 = $("p",zawx).eq( 3 ).text();//numer pisma
  console.log(printLink);
	if(zaw2.length>1){nazwaPliku=nazwaPliku+zaw2;
	}
	var zaw3 =$(".mainTxt",zawx).text();

  			if(zaw3.includes("wywiad")||zaw3.includes("WYWIAD")){

nazwaPliku="WYWIAD "+nazwaPliku;
}												

  var linkwlas=window.location.href;
 var docDefinition ={
    content:[
 
      {text: " ", fontSize: 12 }, 
      { text: zaw, fontSize: 12},
      { text: zaw1, fontSize: 12,alignment: 'right'  },
	  { text: zaw2, fontSize: 12 },
	  {text: " ", fontSize: 12 }, 
	  { text: zaw3, fontSize: 12,lineHeight:1.2 },
	 

	  { text: printLink,fontSize: 8 }
    ]
	
 
    }
   
	console.log(nazwaPliku);
pdfMake.createPdf(docDefinition).download(nazwaPliku+".pdf");//       zakomentować 
  setTimeout(nazwaPliku="", 300);
}
function czestochowa(nazwaPliku,zawx,printLink){
var rep=/<br>/g;
	var zaw = $("p",zawx).eq( 0 ).html().replace(rep,'\n');// adres nadawcy
	var zaw1 = $("p",zawx).eq( 1 ).text().replace(/(\r\n|\n|\r)/gm, "").toString();//miejscowość data
	
	var zaw3 =$(".mainTxt",zawx).text();
  if(zaw3.includes("wywiad")||zaw3.includes("WYWIAD")){

nazwaPliku="WYWIAD "+nazwaPliku;
}					
  var polepisma =zaw3.split('\n');
  console.log(zaw3);
  var zaw2=polepisma[0];
  console.log(zaw2);
  	if(zaw2.length>1){nazwaPliku=nazwaPliku+zaw2;
	}

 var docDefinition ={
    content:[

      {text: " ", fontSize: 12 }, 
      { text: zaw, fontSize: 12},
      { text: zaw1, fontSize: 12,alignment: 'right'  },

	  {text: " ", fontSize: 12 }, 
	  { text: zaw3, fontSize: 12,lineHeight:1.2 },
	 

	  { text: printLink, fontSize: 8 }
    ]
	
 
    }
    
	
pdfMake.createPdf(docDefinition).download(nazwaPliku+".pdf");//                 zakomentować
 setTimeout(nazwaPliku="", 300);
}

 $('#search').append(button);
 $('#search').append(button1);
 $('#search').append(button2);
  
