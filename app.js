let correct = 0
let unCorrect = 0
let counter = correct + unCorrect + 1
let country1, country2

async function getData() {
    const res = await fetch("https://restcountries.com/v3.1/all")
    const data = await res.json()
    return data
}

async function draw() {
    const countries = await getData()
    
    country1 = countries[Math.floor(Math.random() * countries.length)]
    country2 = countries[Math.floor(Math.random() * countries.length)]

    while (country1 === country2) {
        country2 = countries[Math.floor(Math.random() * countries.length)]
    }
    show()
}

function show() {
    const correctText = document.querySelector('#correctText')
    const unCorrectText = document.querySelector('#unCorrectText')

    const name1 = document.querySelector('#countryName1')
    const name2 = document.querySelector('#countryName2')

    const flag1 = document.querySelector('#flag1')
    const flag2 = document.querySelector('#flag2')

    flag1.style.width = '450px'
    flag1.style.height = '300px'

    flag2.style.width = '450px'
    flag2.style.height = '300px'

    flag1.setAttribute('src', country1.flags.png)
    flag2.setAttribute('src', country2.flags.png)

    name1.innerHTML = country1.name.common
    name2.innerHTML = country2.name.common
}

function check() {
    const country1Box = document.querySelector('#countryBox1')
    const country2Box = document.querySelector('#countryBox2')

    const correctText = document.querySelector('#correctText')
    const unCorrectText = document.querySelector('#unCorrectText')

    country1Box.addEventListener('click', () => {
        if (counter == 5) {
            alert('Koniec gry')
            correctText.innerHTML = `Poprawne: ${correct}`
            unCorrectText.innerHTML = `Niepoprawne: ${unCorrect}`
            window.location.reload()
        } else {
            if (country1.population > country2.population) {
                correct++
                correctText.innerHTML = `Poprawne: ${correct}`
            } else {
                unCorrect++
                unCorrectText.innerHTML = `Niepoprawne: ${unCorrect}`
            }
            draw()
        }
    })

    country2Box.addEventListener('click', () => {
        if (correct == 5 || unCorrect == 5) {
            alert('Koniec gry')
            correct = 0
            unCorrect = 0
            correctText.innerHTML = `Poprawne: ${correct}`
            unCorrectText.innerHTML = `Niepoprawne: ${unCorrect}`
        } else {
            if (country2.population > country1.population) {
                correct++
                correctText.innerHTML = `Poprawne: ${correct}`
            } else {
                unCorrect++
                unCorrectText.innerHTML = `Niepoprawne: ${unCorrect}`
            }
            draw()
        }
    })
}

draw()
check()
