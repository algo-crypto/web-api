// init Speech synth api
const synth = window.speechSynthesis;

// Dom Elements

const textForm = document.querySelector('form')
let textInput = document.getElementById('text-input')

const voiceSelect = document.querySelector('#voice-select')
const  rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitchValue = document.querySelector('#pitch-value')
const pitch = document.querySelector('#pitch')
const body = document.querySelector('body')


// init voices array 

let voices = []

const getVoices = () => {
    voices = synth.getVoices()

    // put it in select list
    //loop through voices and creat option for each voice

    voices.forEach((voice) =>{
        // creat option element 
        const option = document.createElement('option')  
        // fill option with the voice and language 
        option.textContent = voice.name + '('+ voice.lang +')' 

        // set needed options attributes

        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        voiceSelect.appendChild(option)

    })



}

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}


// speak 

const speak = () => {
   



    // check if speaking

    if(synth.speaking) {
        console.error('Already speaking')
        return
    }

    if( textInput.value !== '') {

          // add bg image 
          body.style.background = "#444 url(./images/vs.gif)";
          body.style.backgroundRepeat = "repeat-x";
          body.style.backgroundSize = "100% 100%";

        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)

        // speak end
        speakText.onend = e => {
            console.log('done speaking....');
            const CSS_COLOR_NAMES = [
                "AliceBlue",
                "AntiqueWhite",
                "Aqua",
                "Aquamarine",
                "Azure",
                "Beige",
                "Bisque",
                "Black",
                "BlanchedAlmond",
                "Blue",
                "BlueViolet",
                "Brown",
                "BurlyWood",
                "CadetBlue",
                "Chartreuse",
                "Chocolate",
                "Coral",
                "CornflowerBlue",
                "Cornsilk",
                "Crimson",
                "Cyan",
                "DarkBlue",
                "DarkCyan",
                "DarkGoldenRod",
                "DarkGray",
                "DarkGrey",
                "DarkGreen",
                "DarkKhaki",
                "DarkMagenta",
                "DarkOliveGreen",
                "DarkOrange",
                "DarkOrchid",
                "DarkRed",
                "DarkSalmon",
                "DarkSeaGreen",
                "DarkSlateBlue",
                "DarkSlateGray",
                "DarkSlateGrey",
                "DarkTurquoise",
                "DarkViolet",
                "DeepPink",
                "DeepSkyBlue",
                "DimGray",
                "DimGrey",
                "DodgerBlue",
                "FireBrick",
                "FloralWhite",
                "ForestGreen",
                "Fuchsia",
                "Gainsboro",
                "GhostWhite",
                "Gold",
                "GoldenRod",
                "Gray",
                "Grey",
                "Green",
                "GreenYellow",
                "HoneyDew",
                "HotPink",
                "IndianRed",
                "Indigo",
                "Ivory",
                "Khaki",
                "Lavender",
                "LavenderBlush",
                "LawnGreen",
                "LemonChiffon",
                "LightBlue",
                "LightCoral",
                "LightCyan",
                "LightGoldenRodYellow",
                "LightGray",
                "LightGrey",
                "LightGreen",
                "LightPink",
                "LightSalmon",
                "LightSeaGreen",
                "LightSkyBlue",
                "LightSlateGray",
                "LightSlateGrey",
                "LightSteelBlue",
                "LightYellow",
                "Lime",
                "LimeGreen",
                "Linen",
                "Magenta",
                "Maroon",
                "MediumAquaMarine",
                "MediumBlue",
                "MediumOrchid",
                "MediumPurple",
                "MediumSeaGreen",
                "MediumSlateBlue",
                "MediumSpringGreen",
                "MediumTurquoise",
                "MediumVioletRed",
                "MidnightBlue",
                "MintCream",
                "MistyRose",
                "Moccasin",
                "NavajoWhite",
                "Navy",
                "OldLace",
                "Olive",
                "OliveDrab",
                "Orange",
                "OrangeRed",
                "Orchid",
                "PaleGoldenRod",
                "PaleGreen",
                "PaleTurquoise",
                "PaleVioletRed",
                "PapayaWhip",
                "PeachPuff",
                "Peru",
                "Pink",
                "Plum",
                "PowderBlue",
                "Purple",
                "RebeccaPurple",
                "Red",
                "RosyBrown",
                "RoyalBlue",
                "SaddleBrown",
                "Salmon",
                "SandyBrown",
                "SeaGreen",
                "SeaShell",
                "Sienna",
                "Silver",
                "SkyBlue",
                "SlateBlue",
                "SlateGray",
                "SlateGrey",
                "Snow",
                "SpringGreen",
                "SteelBlue",
                "Tan",
                "Teal",
                "Thistle",
                "Tomato",
                "Turquoise",
                "Violet",
                "Wheat",
                "White",
                "WhiteSmoke",
                "Yellow",
                "YellowGreen",
              ];


            let ran = Math.floor(Math.random() * 148)
            body.style.background = `${ CSS_COLOR_NAMES[ran]}`
        }

        // speak erro
        speakText.onerror = e => {
            console.error('something went wrong!')
        }

        // selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        // loop through voices

        voices.forEach((voice) => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice; 
            }
        })

        // set Pitch and rate 
        speakText.rate = rate.value
        speakText.pitch = pitch.value
       
        // speak 
        synth.speak(speakText)
    }
}


//EventListeners


// text form submit

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
})


// rate value change 

rate.addEventListener('change',e => rateValue.textContent = rate.value)


pitch.addEventListener('change',e => pitchValue.textContent = pitch.value)


// voice select cchange 

voiceSelect.addEventListener('change', e => speak());
