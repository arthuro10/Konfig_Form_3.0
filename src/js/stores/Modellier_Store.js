import { observable, action } from 'mobx';
import uuid from 'react-uuid'


class ModellierStore {
    constructor() {
        this.baseURL = 'http://localhost:3000/';
        
    }
    
    // Var Name wird noch verändert. 
    // Hier wird nur ein Prozess geseichert. Komponente nutzen diese Variabel um an die Daten zu kommen.  
    @observable dieProzesse = [];
    // Hier sind alle Prozesse gepeichert. 
    // Von der Datenbank gefetcht.
    @observable allProzesses = [];

    @observable allCreateProzesses = [];

    @observable allInput_Data = [];
    @observable Input_Data = [];

    @observable loading = "";

    @action setDieProzess(item) {
        this.dieProzesse.push(item);
    }
    @action setInput_Data(item) {
        this.Input_Data.push(item);
    }
    @action resetDieProzess() {
        this.dieProzesse = [];
    }
    @action setallProzesses(item) {
        this.allProzesses.push(item);

    }
    @action deleteOneIn_allProzesses(item) {
        console.log();

    }

    @action changeEditValues(id,value) {
        this.dieProzesse.forEach(item => {
            let j;
            for(j = 0; j<item.InputArr.length;j++){

                console.log(item);

                if(id === item.InputArr[j].id ){
                    if(item.OutputArr[j] === undefined){
                        alert("Error: JSON File error. Fehler bei der Definition des JSON. Bei Edit muss es einen passenden Output geben.");
                        return;
                    }
                    item.InputArr[j].editing = value;
                    // Weil nur editierbare Komponenten diese Funktion hier aufrufen
                    // Und damit sogleich auch die Output Daten sind
                    item.OutputArr[j].datatype = item.InputArr[j].datatype;
                    item.OutputArr[j].input = item.InputArr[j].input;
                    item.OutputArr[j].data = value;
                }
            }
        });
    }
    
    

     @action fetchProzesse() {
        return  fetch(this.baseURL+'api/prozess', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("get request logs");
                        console.log(json);
                        console.log(json.data);
                        //console.log(json.data.length);
                        this.allProzesses = json.data;
                        console.log("fetch: " + this.allProzesses.length);
                        
                    });

                } else {
                    this.error = "Error on fetching";
                    console.log("fetch: error");
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    console.log("fetch: error");
                    throw error;
                }
            ); 
    }
     

    @action addingProzesse(newProzess) {
        return fetch(this.baseURL+ 'api/prozess/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }, 
            body: JSON.stringify({
                prozess : newProzess,
                id : uuid()
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("json");
                        console.log(json);
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
    @action updateProzess(_prozess) {

        const prozessItem = this.allProzesses.filter(item => {
            let prozessIdObj = [...item.prozess];
            console.log(prozessIdObj[0].prozessId);
            return _prozess[0].prozessId === prozessIdObj[0].prozessId
        })

        return fetch(this.baseURL+ 'api/prozess/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }, 
            body: JSON.stringify({
                prozess : _prozess,
                id : prozessItem[0].id
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("json");
                        console.log(json);
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action fetchCreateProzesse() {
        return  fetch(this.baseURL+'api/createJsonFile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("get request logs");
                        console.log(json);
                        console.log(json.data);
                        //console.log(json.data.length);
                        this.allCreateProzesses = json.data;
                        console.log("fetch: " + this.allCreateProzesses.length);
                        
                    });

                } else {
                    this.error = "Error on fetching";
                    console.log("fetch: error");
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    console.log("fetch: error");
                    throw error;
                }
            ); 
    }

    @action deletingProzess(ID) {
        console.log(ID);
        return fetch(this.baseURL+'api/prozess/' + ID, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("Prozess deleted");
                        
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }


}
 

const store = new ModellierStore();

    export default store;
