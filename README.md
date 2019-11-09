# YHack 2019 Hackathon Submission

## What it does
This project is app that allows users to make informed purchases by photographing company logos and summarizing their environmental impact and controversial news. 
Consumers can then decide which companies to support through their purchases.

## Try It Out!
![QR Code Image](https://github.com/michaelhtleung/yhack2019/blob/master/public/img/try-it-out.png)
- [Click here on mobile](bit.ly/32QeaJr)
- Or scan the QR Code with your phone

## Photos
Home Page

![Home Page Image](https://github.com/michaelhtleung/yhack2019/blob/master/public/img/scanPage.png)

Input Photograph

![Input Photo Image](https://github.com/michaelhtleung/yhack2019/blob/master/public/img/microsoft.png)

Output Results Page

![Output Results Photo Image](https://github.com/michaelhtleung/yhack2019/blob/master/public/img/scanPage.png)

## Concepts Applied
- Cloud Services 
- Machine Learning APIs
- Web Crawling
- Text Summarization Algorithms
- Single-Threaded Asynchronous Programming 
- AJAX
- HTTP Client-Webserver Communication
- Event Listeners

## Tools
### Server-side
- Firebase Cloud Functions
- GCP Cloud Vision API
- GCP Cloud Storage
- Crawler NPM Module
- CORS NPM Module

### Client-side
- HTML, CSS, JS
- XMLHttpRequest

## How it works
The project consists of an Single-Page Application (SPA) and a Firebase backend. The SPA allows the user to send pictures 
on desktop or on mobile devices. These photos are then send to Google Cloud Storage. The SPA has an event listener that
listens for when a photo is successfully submitted to Cloud Storage. In the event listener, an AJAX HTTP request is 
made to a Cloud Functions API endpoint. The server then sends the photo to the GCP Cloud Vision API
to identify the company. The company name is then fed into a custom-made web scraper that scrapes all relevant paragraphs
of the company's Wikipedia page. The server sends the company name and relevant paragraphs as an HTTP response back to the
client for display to the user.

The SPA uses event listeners to transition between different pages at different stages of the app's submission process.

## Technical Limitations
Since GCP does not have an NLP API dedicated to summarizing text, we wrote our own algorithm for this feature. 
Since our algorithm does not use machine learning and was made over a weekend, our summarization algorithm still has
room for improvement.

## Additional Resources
- [Pitch Deck](http://bit.ly/2BO8fse)
- [Devpost](https://devpost.com/software/biased-d25q80)
