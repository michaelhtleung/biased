# YHack 2019 Hackathon Submission

## What it does
This project is app that allows users to make informed purchases by photographing company logos and summarizing their environmental impact and controversial news. 
Consumers can then decide which companies to support through their purchases.

## [Try It Out!]
- [Click here on mobile](bit.ly/32QeaJr)
- Or scan the QR Code with your phone

## Photos
Home Page

Input Photograph

Output Results Page


## How it works
The project is a Single-Page Application that allows the user to send pictures on desktop or on mobile devices. These
photos are then send to Google Cloud Storage. There is an event listener that 
a REST API endpoint defined in Firebase Cloud Functions via an HTTP request. A Cloud Function then

## Concepts Applied
- Cloud Services 
- Machine Learning APIs
- Web Crawling
- Text Summarization Algorithms
- AJAX
- Event Listeners

## Tools
### Server-side
- Firebase Cloud Functions
- GCP Cloud Vision API
- GCP Cloud Storage
- crawler npm module
- cors npm module

### Client-side
- HTML, CSS, JS
- XMLHttpRequest

## Technical Limitations
Since GCP does not have an NLP API dedicated to summarizing text, we wrote our own algorithm for this feature. 
Since our algorithm does not use machine learning and was made over a weekend, our summarization algorithm still has
room for improvement.

## Additional Resources
- [Pitch Deck](http://bit.ly/2BO8fse)
- [Devpost](https://devpost.com/software/biased-d25q80)
