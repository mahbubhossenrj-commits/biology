const terms = [
  ["Adaptation","অভিযোজন","A feature that helps an organism survive and reproduce."],
  ["Algae","শৈবাল","A diverse group of mostly aquatic, photosynthetic organisms."],
  ["Bacteria","ব্যাকটেরিয়া","Microscopic single-celled prokaryotic organisms."],
  ["Cell","কোষ","The basic structural and functional unit of life."],
  ["Chlorophyll","ক্লোরোফিল","The green pigment that absorbs light for photosynthesis."],
  ["DNA","ডিএনএ","The molecule that carries hereditary genetic information."],
  ["Ecology","বাস্তুবিদ্যা","The study of organisms and their environment."],
  ["Evolution","বিবর্তন","Change in heritable characteristics of populations over generations."],
  ["Fungi","ছত্রাক","A kingdom of organisms that absorb nutrients from organic matter."],
  ["Gene","জিন","A unit of heredity made of a sequence of DNA."],
  ["Habitat","আবাসস্থল","The natural place where an organism lives."],
  ["Mitosis","মাইটোসিস","A type of cell division that produces two genetically similar daughter cells."],
  ["Mycology","ছত্রাকবিজ্ঞান","The branch of biology that studies fungi."],
  ["Photosynthesis","সালোকসংশ্লেষণ","The process by which plants convert light energy into chemical energy."],
  ["Species","প্রজাতি","A group of organisms that can generally interbreed and produce fertile offspring."]
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabetEl = document.getElementById("alphabet");
const termList = document.getElementById("termList");
const dictSearch = document.getElementById("dictSearch");
const termCount = document.getElementById("termCount");
let activeLetter = "ALL";
function renderAlphabet(){
  alphabetEl.innerHTML = `<button class="${activeLetter==="ALL"?"active":""}" data-letter="ALL">ALL</button>` + alphabet.map(l=>`<button class="${activeLetter===l?"active":""}" data-letter="${l}">${l}</button>`).join("");
}
function renderTerms(){
  const q = dictSearch.value.trim().toLowerCase();
  const filtered = terms.filter(t=>(activeLetter==="ALL"||t[0][0]===activeLetter) && (!q||t.join(" ").toLowerCase().includes(q)));
  termList.innerHTML = filtered.length ? filtered.map(t=>`<article class="term"><div><b>${t[0]}</b><small>${t[1]}</small></div><p>${t[2]}</p><span>${t[0][0]}</span></article>`).join("") : `<div class="empty">No matching terms found. Try another word.</div>`;
  termCount.textContent = `${String(filtered.length).padStart(2,"0")} TERMS`;
}
renderAlphabet();renderTerms();
alphabetEl.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;activeLetter=b.dataset.letter;renderAlphabet();renderTerms()});
dictSearch.addEventListener("input",renderTerms);
const toast=document.getElementById("toast");
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
document.getElementById("searchForm").addEventListener("submit",e=>{
 e.preventDefault();const q=document.getElementById("siteSearch").value.trim();if(!q){showToast("Type a biology topic to search.");return}
 const match=terms.find(t=>t.join(" ").toLowerCase().includes(q.toLowerCase()));
 if(match){activeLetter=match[0][0];dictSearch.value=q;renderAlphabet();renderTerms();document.getElementById("dictionary").scrollIntoView();showToast("Found in the Biology Dictionary.");}
 else {const cards=[...document.querySelectorAll(".topic-card")];const found=cards.find(c=>(c.dataset.search||"").toLowerCase().includes(q.toLowerCase()));if(found){found.scrollIntoView({behavior:"smooth",block:"center"});showToast("Explore this learning field.");}else{dictSearch.value=q;activeLetter="ALL";renderAlphabet();renderTerms();document.getElementById("dictionary").scrollIntoView();showToast("No exact match yet. Try a related term.");}}
});
document.getElementById("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");document.getElementById("themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾"});
let bangla=false;
document.getElementById("languageToggle").addEventListener("click",()=>{
 bangla=!bangla;document.body.classList.toggle("bn",bangla);
 document.querySelectorAll("[data-en][data-bn]").forEach(el=>el.textContent=bangla?el.dataset.bn:el.dataset.en);
 document.querySelectorAll("[data-en-html][data-bn-html]").forEach(el=>el.innerHTML=bangla?el.dataset.bnHtml:el.dataset.enHtml);
 document.getElementById("languageToggle").textContent=bangla?"English":"বাংলা";
 document.getElementById("siteSearch").placeholder=bangla?"জীববিজ্ঞানের বিষয়, শব্দ বা জীব খুঁজুন...":"Search biology topics, terms, organisms...";
 document.getElementById("dictSearch").placeholder=bangla?"শব্দ খুঁজুন...":"Search a term...";
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
