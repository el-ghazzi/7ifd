let suwarPages = []
const sorah = document.querySelector('.sorah')
const sorahContainer = document.querySelector('.sorah-container')
const quranCounter = document.querySelector('.quran-counter')
const quranPagesComp = quranCounter.querySelector('.quran-pages-completed')
const quranPagesLeft = quranCounter.querySelector('.quran-pages-left')
const quranPagesLeftPerc = quranCounter.querySelector('.quran-pages-left-percantage')
const completedSurahs = quranCounter.querySelector('.completed-surahs')
const leftSurahs = quranCounter.querySelector('.left-surahs')
const ulContainer = document.querySelector('.ul-container')
const ulButton = ulContainer.querySelector('button')
const ulContainerUl = ulContainer.querySelector('ul')
const quranPage = document.querySelector('.quran-page')
ulButton.addEventListener('click', function() {
    ulButton.classList.toggle('button-up')
    ulContainerUl.classList.toggle('ul-active')
    sorah.classList.toggle('sorah-active')
    sorahContainer.classList.toggle('sorah-container-active')
    quranCounter.classList.toggle('quran-counter-active')
})
let completedSurahsArray = []
let totalPagesTest = 604
let completedSurah = 0
let pagesCompletedTest = new Set()
let surahLi
let pagesCompArray 


if (localStorage.getItem('completedSurahs') !== null) {
    completedSurahsArray =  (localStorage.getItem('completedSurahs')).split(',')
}



function marksCompletedTest (page) {
         pagesCompletedTest.add(page)
        
}

function fixLeftPages () {
     const totalLeftPages = 604 - pagesCompletedTest.size
     return totalLeftPages
}

function fixCompletedTest () {
    const totalCompletedTest = pagesCompletedTest.size
    return totalCompletedTest
}


if (localStorage.getItem('completedQuranPages') !== null ) {
    let completedQuranPagesArray = JSON.parse(localStorage.getItem('completedQuranPages'))
   
    completedQuranPagesArray.forEach(page => {
    marksCompletedTest(page)
})
}
if (localStorage.getItem('quranPagesCompleted') !== null) {
    quranPagesComp.querySelector('span').textContent = localStorage.getItem('quranPagesCompleted')
} 
if (localStorage.getItem('quranPagesLeft') !== null) {
    
    quranPagesLeft.querySelector('span').textContent = localStorage.getItem('quranPagesLeft')
} 
if (localStorage.getItem('quranPagesCompleted') !== null) {
    quranPagesLeftPerc.querySelector('span').textContent = localStorage.getItem('quranPagesLeftPerc')
} 
if (localStorage.getItem('completedSurahsCounter') !== null) {
    completedSurahs.querySelector('span').textContent = localStorage.getItem('completedSurahsCounter')
   
    completedSurah = +localStorage.getItem('completedSurahsCounter')
}
if (localStorage.getItem('leftSurahsCounter') !== null) {
    leftSurahs.querySelector('span').textContent = localStorage.getItem('leftSurahsCounter')
}

document.querySelector('.clear').addEventListener('click', () => {
       localStorage.clear()
       window.location.reload()
}) 








let completedPagesSet = new Set()
let pagesCounterCompleted = 0
function marksCompletedPages(page) {  
         completedPagesSet.add(page)
}


function updateTotalCompletedPages() {
    const totalCompletedPages = completedPagesSet.size
    return totalCompletedPages
}

let soraIndex = 0
let test = 0
let quranLeftPages = 0
let quranLeftPagesPercentage = 0
let array = []
let pagesCounter = []


async function fetchQuran() {
    try {
    const response = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani')
    if (!response.ok) {
        throw new Error(`status: ${response.status}`)
    }
    const data = await response.json()
   
    const surahsList = data.data.surahs
    surahsList.forEach(surah => {
        let pagesNumber
        let startPage = surah.ayahs[0].page
        let endPage = surah.ayahs[surah.ayahs.length - 1].page 
     if (surah.ayahs[surah.ayahs.length - 1].page - surah.ayahs[0].page  !== 0) {
        pagesNumber = (surah.ayahs[surah.ayahs.length - 1].page - surah.ayahs[0].page + 1) 
     } else if (surah.ayahs[surah.ayahs.length - 1].page - surah.ayahs[0].page  === 0) {
         pagesNumber = 1
     }  
        suwarPages.push({name: surah.englishName, pages : pagesNumber, startPage: startPage, endPage: endPage,})
    });
     suwarPages.forEach((sura, index) => {
        const suraLi = document.createElement('li')
        suraLi.innerText = sura.name
        suraLi.dataset.number = suwarPages[index].pages
        suraLi.dataset.startpage = suwarPages[index].startPage
        suraLi.dataset.endpage = suwarPages[index].endPage
        document.querySelector('ul').appendChild(suraLi)
    })
    document.querySelector('ul').querySelector('.loading').style.display = 'none'
    const suwarLiList = document.querySelectorAll('li')
    let leftPagesSet = suwarLiList[suwarLiList.length - 1].dataset.endpage
    if (completedSurahsArray !== null) {
        completedSurahsArray.forEach(element => {
           suwarLiList[+element].classList.add('completed')
        })
    }
    suwarLiList.forEach((li, index) => {
    const suraContainer = document.createElement('div')
    suraContainer.classList.add('sura-container')
    const sorahForm = document.createElement('form')
    const sorahTitle = document.createElement('h3')
    const pagesLeft = document.createElement('p')
    const button = document.createElement('button')
    button.classList.add('btn-grad')
    button.innerText = 'done' 
    sorahTitle.innerText = suwarPages[index].name
    pagesLeft.dataset.pagesleft = suwarPages[index].pages
    pagesLeft.dataset.startPage = suwarPages[index].startPage
    pagesLeft.dataset.endPage = suwarPages[index].endPage
    if (suwarPages[index].pages > 1) {
         pagesLeft.innerText = 'Left pages: ' + suwarPages[index].pages 
    } else {
        pagesLeft.innerText = 'Left pages: ' + suwarPages[index].pages 
    }
    suraContainer.appendChild(sorahTitle)
    sorahForm.appendChild(pagesLeft)
    sorahForm.appendChild(button)
    suraContainer.appendChild(sorahForm)
    sorahContainer.appendChild(suraContainer)
    li.addEventListener('click', function() {
        suwarLiList.forEach(element => {
            element.classList.remove('clicked')
        })
        li.classList.add('clicked')
        sorahContainer.querySelectorAll('.sura-container').forEach(element => {
            element.classList.remove('sura-active')
        })
        suraContainer.classList.add('sura-active')
        
        if (localStorage.getItem('pagescounter' + index) !== null ) {
            pagesCounter = localStorage.getItem('pagescounter' + index)
        } else {
                pagesCounter = parseInt(pagesLeft.dataset.pagesleft)
        }
        if (localStorage.getItem('pagescounter' + index) !== null ) {
            
            pagesCounterCompleted = parseInt(+pagesLeft.dataset.startPage + +localStorage.getItem('pagescounter' + index) )
          
        } else {
              pagesCounterCompleted = parseInt(pagesLeft.dataset.startPage )- 1
              
        }
    })
})  
let suraContainerList = sorahContainer.querySelectorAll('.sura-container')
if (completedSurahsArray !== null) {
    completedSurahsArray.forEach(element => {
        suraContainerList[+element].classList.add('surah-completed')
    })
}
  suraContainerList.forEach((sura,index) => {
      const  sorahForm = sura.querySelector('form')
      const pagesLeft = sorahForm.querySelector('p')
      if (sura.classList.contains('surah-completed')) {
       
        sorahForm.querySelector('button').remove()
        pagesLeft.textContent = ''
        pagesLeft.classList.add('pages-left-completed')
      }
      if (localStorage.getItem('pagescounter' + index) !== null && localStorage.getItem('pagescounter' + index) != 0 ) {
            pagesLeft.innerHTML = 'Left pages: ' + localStorage.getItem('pagescounter' + index)
        }
      sorahForm.addEventListener('submit', function(e) {
        e.preventDefault()
        if (pagesCounter > 0) {
        pagesCounter -= 1
        leftPagesSet -= 1
        pagesCounterCompleted += 1
        marksCompletedTest(pagesCounterCompleted)
        pagesCompArray = Array.from(pagesCompletedTest)
        localStorage.setItem('completedQuranPages', JSON.stringify(pagesCompArray))
        
        let a = fixLeftPages()
        localStorage.setItem('completedPages', fixCompletedTest())
        localStorage.setItem('leftPages', fixLeftPages())
        localStorage.setItem('leftPagesPerc', ((fixCompletedTest() / 604) * 100).toFixed(2) + '%')
        localStorage.setItem('quranPagesCompleted', fixCompletedTest())
        localStorage.setItem('quranPagesLeft', a)
        localStorage.setItem('quranPagesLeftPerc', ((fixCompletedTest() / 604) * 100).toFixed(2) )
        quranPagesComp.querySelector('span').innerText = fixCompletedTest()
        quranPagesLeft.querySelector('span').innerText = fixLeftPages()
        quranPagesLeftPerc.firstElementChild.innerText = ((fixCompletedTest() / 604) * 100).toFixed(2) + '%'
        localStorage.setItem('pagescounter' + index, pagesCounter)
        pagesLeft.innerHTML =`Left page: <span>${pagesCounter}</span>`
        } else {
            pagesCounter = 'done'
            pagesLeft.innerText = 'congratulations'
        }
        if (pagesCounter === 0) {
            pagesLeft.textContent = ''
            completedSurah += 1
            let leftSurah = 114 - completedSurah
            completedSurahs.querySelector('span').textContent = completedSurah
            leftSurahs.querySelector('span').textContent = leftSurah
            localStorage.setItem('completedSurahsCounter', completedSurah)
            localStorage.setItem('leftSurahsCounter', leftSurah)
            pagesLeft.classList.add('pages-left-completed')
            sorahForm.querySelector('button').remove()
            suwarLiList[index].classList.add('completed')
            completedSurahsArray.push(index)
            localStorage.setItem('completedSurahs', completedSurahsArray)
            }
       }) 
      } )
   } catch(error) {
    console.error(error)
   }
   }

fetchQuran()



const root = document.querySelector(':root');
lightBtn = document.querySelector('.light-btn')
darkBtn = document.querySelector('.dark-btn')

let lightMode = localStorage.getItem('lightMode')

const enableLightMode = () => {
    document.body.classList.add('light-mode')
    document.querySelector('.dark-audio').pause()
    document.querySelector('.dark-audio').currentTime = 0
    darkBtn.style.display = 'block'
    lightBtn.style.display = 'none'
    localStorage.setItem('lightMode', 'on')
    root.style.setProperty('scrollbar-color', 'var(--h3-color) #eeeeee');
}
const enableDarkMode = () => {
    document.body.classList.remove('light-mode')
    document.querySelector('.light-audio').pause()
    document.querySelector('.light-audio').currentTime = 0
    lightBtn.style.display = 'block'
    darkBtn.style.display = 'none'
    localStorage.setItem('lightMode', 'off')
    root.style.setProperty('scrollbar-color', 'var(--h3-color) var(--second-color);')
}

if (lightMode === 'on') {
    enableLightMode()
}


const modBtn = document.querySelector('.mode')
modBtn.addEventListener('click', () => {
    if (lightMode === 'on') {
     enableDarkMode()
     document.querySelector('.dark-audio').play()
     
    } else {
    enableLightMode()
    document.querySelector('.light-audio').play()
  
    }
    lightMode = localStorage.getItem('lightMode')
})

