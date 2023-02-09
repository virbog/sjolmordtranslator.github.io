window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const voiceRecognition = new SpeechRecognition();
voiceRecognition.interimResults = true;
voiceRecognition.lang = "en-US";

let paragraph = document.createElement('p');
const caption = document.querySelector('.caption');
caption.appendChild(paragraph);


voiceRecognition.addEventListener('result', e => {
	let transcript = [...e.results[0]].map(result => result.transcript).join('');
	transcript = `${transcript.charAt(0).toUpperCase()}${transcript.slice(1).toLowerCase()}.`
	var sourceLang = 'en';
	var targetLang = 'uk';
	var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(transcript);
	$.getJSON(url, function(data) {
      transcriptTr = data[0][0][0];
    });
	paragraph.innerHTML = transcriptTr;
	caption.scrollTop = caption.scrollHeight;


	if(e.results[0].isFinal){
		paragraph = document.createElement('p');
		caption.appendChild(paragraph);
	}
});

voiceRecognition.addEventListener('end', voiceRecognition.start);
voiceRecognition.start();

const copyToClipboard = (containerid) => {
	if (document.selection) {
	let range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(containerid));
		range.select().createTextRange();
		document.execCommand("copy");
	} else if (window.getSelection) {
		let range = document.createRange();
		range.selectNode(document.getElementById(containerid));
		window.getSelection().addRange(range);
		document.execCommand("copy");
	}
}

