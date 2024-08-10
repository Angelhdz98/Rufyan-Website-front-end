import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../types/typesIndex";

import project1 from "../../../public/assets/Images/imgProyectos/Imagen1-Banner.png";
import project2 from "../../../public/assets/Images/imgProyectos/image 18.png";
import project3 from "../../../public/assets/Images/imgProyectos/image 20.png";
import project4 from "../../../public/assets/Images/imgProyectos/image 22.png";
import project5 from "../../../public/assets/Images/imgProyectos/image 23.png";
import project6 from "../../../public/assets/Images/imgProyectos/image 24.png";



export interface ProjectsState{
    data: Project[];
    isLoading: boolean;
    error: string|null;
}

const projectsInitialState:ProjectsState= {
    data:[
        {   id:1,
            title: "Heineken colaboration", 
            date: new Date(2022,7,12).toISOString(),
            collaborator: "Heineken",
            description: "tuve una colaboración con heineken Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            images: [project1, project2],
          },
          {
            id:2,
            title: "Perico X Calzada overpass mural", 
            date: new Date(2018,7,12).toISOString(),
            collaborator: "Guadalajara government",
            description: "I was selected in a convocatory to give it color and life to the periferico avenue overpass crossing calzada avenue, I did  a tribute to my beginning and the people and whom support me since then",
            images:[project3, project4],
          },
          {
            id:3,
            title: "Mural on Calzada Independencia",
            date: new Date(2018, 7, 12).toISOString(),
            collaborator: "Government of Guadalajara",
            description: "I was selected in a call to give color and life to the peripheral avenue overpass crossing Calzada Avenue. I made a tribute to my beginnings and to the people who supported me from the start.",
            images:[project5, project6],
        },
        {
            id:4,
            title: "Exhibition at the Museum of Modern Art",
            date: new Date(2019, 4, 20).toISOString(),
            collaborator: "Museum of Modern Art",
            description: "I participated in a group exhibition at the Museum of Modern Art, presenting a series of paintings inspired by urban nature.",
            images:[project1, project2],
        },
        {
            id:5,
            title: "Urban Art Festival",
            date: new Date(2020, 9, 15).toISOString(),
            collaborator: "Urban Art Festival",
            description: "I created a mural during the Urban Art Festival, highlighting the interaction between nature and the city.",
            images:[project3, project4],
        },
        {
            id:6,
            title: "Art Residency in Berlin",
            date: new Date(2021, 2, 10).toISOString(),
            collaborator: "Berlin Cultural Institute",
            description: "I was invited to an art residency in Berlin, where I developed a series of works exploring identity and public space.",
            images:[project5, project6],
        },
        {
            id:7,
            title: "Mural at Primary School",
            date: new Date(2022, 1, 25).toISOString(),
            collaborator: "Benito Juárez Primary School",
            description: "I created a collaborative mural with the students of Benito Juárez Primary School, focusing on the importance of education and creativity.",
            images:[project1, project2],
        },
        {
            id:8,
            title: "Solo Exhibition at Local Gallery",
            date: new Date(2021, 6, 30).toISOString(),
            collaborator: "Contemporary Art Gallery",
            description: "I presented my first solo exhibition at the Contemporary Art Gallery, with a collection of abstract works.",
            images:[project3, project4],
        },
        {
            id:9,
            title: "Community Art Workshop",
            date: new Date(2020, 11, 5).toISOString(),
            collaborator: "La Esperanza Community Center",
            description: "I organized an art workshop for young people at La Esperanza Community Center, promoting artistic expression and social cohesion.",
            images:[project5, project6],
        },
        {
            id:10,
            title: "Artistic Intervention in Public Square",
            date: new Date(2019, 3, 18).toISOString(),
            collaborator: "Guadalajara City Hall",
            description: "I carried out an artistic intervention in a public square, using mixed techniques to transform the urban space.",
            images:[project1, project2],
        },
        {
            id:11,
            title: "Collaboration with International Artist",
            date: new Date(2022, 8, 14).toISOString(),
            collaborator: "International Artist John Doe",
            description: "I collaborated with international artist John Doe on a mural project in the historic center, merging styles and techniques.",
            images:[project3, project4],
        },
        {
            id:12,
            title: "Mural at General Hospital",
            date: new Date(2021, 12, 20).toISOString(),
            collaborator: "Guadalajara General Hospital",
            description: "I painted a mural at the Guadalajara General Hospital, aiming to provide a more welcoming and hopeful environment for patients.",
            images:[project5, project6],
        },
        {
            id:13,
            title: "Art Installation in Urban Park",
            date: new Date(2020, 5, 10).toISOString(),
            collaborator: "Metropolitan Park",
            description: "I developed an interactive art installation at the Metropolitan Park, focusing on sustainability and the environment.",
            images:[project1, project2],
        },
        {
            id:14,
            title: "Public Art Project at University",
            date: new Date(2022, 10, 5).toISOString(),
            collaborator: "University of Guadalajara",
            description: "I carried out a public art project at the University of Guadalajara, working with students to create a mural reflecting diversity and inclusion.",
            images:[project3, project4],
        }
          
        
    ],
    isLoading: false,
    error: null,
    
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsInitialState,
    reducers:{
        addProject:(state,action) =>{
            state.data.push(action.payload)
        }
    },
    extraReducers(){
        //builder.addCase //Here I will add the reducers of fetching
    }
})

export const projectsReducer= projectsSlice.reducer;