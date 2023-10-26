# Solution ✅

For this solution I used the vite.js bundler to bootstrap the project. I created the skeleton with the command:

```bash
npm create vite@latest trugolf-vite-ts -- --template vue-ts
```

## Tech Stack 📚

- Bundler: [Vite.JS](https://vitejs.dev/)
  - vite was built by the Vue team and has first class support for modern Vue, runs blazingly fast, and is easily configurable.
- Language: [Typescript](https://www.typescriptlang.org/)
  - I always prefer Typescript when given the option. While dealing with 3rd party APIs/Packages can be a bit encumbered by adding Typescript, the readability of code and increased stability of type checking are well worth ti.
- Components: [VuetifyJS](https://vuetifyjs.com/en/)
  - This was used in the starter template. I have have used vuetify before and find it to be pretty good. Normally I would use Material components but Vuetify is pretty comparable.
- Charts: [chart.js](https://www.chartjs.org/)
  - chartjs is fairly established as the best Javascript charting library and has great Vue support, so this was a straightforward choice.
- State Management: [pinia.js](https://pinia.vuejs.org/)
  - Pinia is the successor to vuex and is a pure joy to use when combined with a modern Vue3 composition-api application. It provides its own composition-api-like syntax which makes writing state management code feels just like writing Vue scripts. 
- Icons: [Material Design Icons](https://pictogrammers.com/library/mdi/)
  - MDI is a supported font/icon library with Vuetify so this option made sense and was fairly straightforward to install.

## Organization
- App.vue
  - main component that triggers a data load in the shotsStore store by calling 'loadShots'
  - handles the load state of the shots and displays a loading spinner during loading, an error if loading fails, otherwise the two child components ShotChart and ShotTable.

- ShotTable.vue
  - displays the tabular shot data using a Data Chart from Vuetify. The table is paginated and filterable by Club Type.
  - each row is expandable (click button at the end of the row) to show a few more fields about the shot

- ShotChart.vue
  - a simple line chart of the round score by shot
  - uses chart.js and builds the charting data once given the shotsStore.shots data array

## Other Notes
*Why no routing?*

It's not really needed for a single page, but I would use something like Vue-Router if there was a need for multiple pages

*Why the composition API?*

I like the new syntax for defining script logic because it feels more like natural programming versus Vue2 options API which feels more like writing a YAML file

*Why no color theme or fancy CSS languages?*

Normally I use Tailwind for heavily styled sites in React/Vue. In this case I relied mostly on the styling given by vuetify and chartjs with a little CSS sprinkled in.

*Tests????*

Do I look like a Software Tester? Just kidding. Vue-Test-Utils would be great to add if given more time and the app grows in complexity.
