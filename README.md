# Luna Yogi - E16 Capstone Project! [![Netlify Status](https://api.netlify.com/api/v1/badges/bd6ac731-e8af-494b-86c7-e7043c84034a/deploy-status)](https://app.netlify.com/sites/lunayogi/deploys)


![luna yogi](https://user-images.githubusercontent.com/86667443/146215625-4f07fa01-4218-4426-bab2-f13b208330ca.png)

## [View Site](https://lunayogi.netlify.app/)
## Get Started:


```javascript
 $ git clone git@github.com:marybethhunter/LunaYogi-E16Capstone.git
 $ cd LunaYogi-E16Capstone
```

## About
* Luna Yogi is a movement and mindfulness app that allows users to get daily meditations and affirmations, blog posts, and yoga flows. 
* I created Luna Yogi to have everything movement and mindfulness I need all in one place. Personally, I have two meditation apps, a yoga app, and a few different blog sites I use in conjunction with each other. It can be a lot to keep up with. Luna Yogi is the one-stop-shop for all of these things!


## Features: 

#### **Unauthenticated Users**:
* Unauthenticated users have read-only access to the daily meditation, affirmation, and blog views.
#### **Authenticated Users**:
* Authenticated users have access to the above views, as well as the yoga and account views. In the yoga view, they can get a randomized yoga flow, choose a flow from a list, or create their own. Authenticated users also have an account page that shows all of the content they have saved that they can refer back to at any time. Content that can be saved to an authenticated user's account consists of: blog posts, yoga flows, affirmations, and meditations.
#### **Admin CRUD**: 
* As the administrator of this site, I have full CRUD capabilities on the blog post section of the site.

## [Loom video walkthrough!]()

## Relevant Links:
* [Figma Wireframe](https://www.figma.com/file/7uOdLefTT25DgrhhqTfmkS/Luna-Yogi-Capstone?node-id=0%3A1)
* [Technical Flowchart](https://docs.google.com/presentation/d/1pf3ZF9VGCbTWPnRUrzNJ-a2sat36xseGr8uGBnimu-s/edit?usp=sharing)
* [ERD](https://dbdiagram.io/d/61a4fdef8c901501c0d7c844)
* [Project Board](https://github.com/marybethhunter/LunaYogi-E16Capstone/projects/1)

## Code Snippets:

```javascript
  // saving chosen custom poses to database
  const saveCustomPoses = async () => {
    const flowIdToAdd = await getMostRecentFlow(user.uid);
    chosenPoses.forEach((chosenPose) => {
      const newId = addOne();
      addPoseToDB({
        ...chosenPose,
        flowId: flowIdToAdd.flowId,
        orderNumber: newId,
      }).then(() => {
        history.push(`/account/${user.uid}`);
      });
    });
  };
```

## Technology Used:
* Javascript
* React
* Firebase
* Postman
* Figma
* Axios
* React Audio Player
* Reactstrap
* Styled Components
* Lightning Yogi API

## Screenshots:

<img width="959" alt="2021-12-18" src="https://user-images.githubusercontent.com/86667443/146653191-c8351833-4ea0-4e0d-9d24-28bd5e3e54a4.png">
<img width="957" alt="2021-12-18 (1)" src="https://user-images.githubusercontent.com/86667443/146653192-a23b11ec-e2ee-4097-b8b7-a4d231866219.png">
<img width="960" alt="2021-12-18 (2)" src="https://user-images.githubusercontent.com/86667443/146653194-825db12d-903d-4938-9943-3c8f372c1a3c.png">
<img width="953" alt="2021-12-18 (3)" src="https://user-images.githubusercontent.com/86667443/146653197-30295982-9455-4e43-99b3-1e9c07d26c35.png">


## Contributors: Mary Beth Hunter, [Github](https://github.com/marybethhunter), [Portfolio](https://marybeth-hunter.com/)
