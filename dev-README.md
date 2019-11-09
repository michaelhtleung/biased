## Developer How To
locally test project: 
- `firebase serve`

deploy project: 
- `firebase deploy`

deploy cloud functions only: 
- `firebase deploy --only functions`

enabling cors:
- use expressjs middleware npm module

still having cors/API issues:
- try `rm .firebase/ -r`, unsure if this works reliably