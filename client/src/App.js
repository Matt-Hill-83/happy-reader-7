import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react";

import MainStory from "./components/MainStory/MainStory";
import "./App.module.scss";

// import this last
import { UserConfigStore } from "./Stores/UserConfigStore";

function App() {
  const muiTheme = getMuiTheme();

  const [cookies, setCookie] = useCookies(["name"]);
  const newName = Math.floor(Math.random() * 1000 + 1);

  if (!cookies.name) {
    setCookie("name", newName, { path: "/" });
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <span>{UserConfigStore.docs}</span>
        {cookies.name && <h1>{`Hello Charlie-${cookies.name}!`}</h1>}
        <MainStory />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

// Realtime DB with keys in a RT function
//
// import React, { Component } from "react";
// import axios from "axios";
// import { Button, Icon, Tab, Tabs } from "@blueprintjs/core";
// // import words from "../../Models/words";

// import words from "./Models/words";

// import "./App.css";

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       buyItems: [],
//       message: ""
//     };
//   }

//   componentDidMount() {
//     return axios
//       .get("https://us-central1-happy-reader-7.cloudfunctions.net/getItems")
//       .then(response => {
//         this.setState({
//           buyItems: response.data
//         });
//       });
//   }

//   addItem(event) {
//     event.preventDefault();
//     const { buyItems } = this.state;
//     const newItem = this.newItem.value;

//     const isOnTheList = buyItems.includes(newItem);

//     if (isOnTheList) {
//       this.setState({
//         message: "This item is already on the list"
//       });
//     } else {
//       return (
//         newItem !== "" &&
//         axios
//           .post(
//             "https://us-central1-happy-reader-7.cloudfunctions.net/addItem",
//             { item: newItem }
//           )
//           .then(response => {
//             this.setState({
//               buyItems: response.data,
//               message: ""
//             });
//             this.addForm.reset();
//           })
//       );
//     }
//   }

//   removeItem(item) {
//     const newBuyItems = this.state.buyItems.filter(buyItems => {
//       return item !== buyItems;
//     });

//     return axios
//       .delete(
//         `https://us-central1-happy-reader-7.cloudfunctions.net/deleteItem?id=${
//           item.id
//         }`
//       )
//       .then(response => {
//         this.setState({
//           buyItems: response.data
//         });
//       });
//   }

//   clearAll() {
//     this.setState({
//       buyItems: [],
//       message: "No Item on the list, add some"
//     });
//   }

//   renderItems() {
//     let id = 1;
//     const { buyItems, message } = this.state;

//     return (
//       buyItems.length > 0 && (
//         <table className="table">
//           <caption>Shopping List - happy reader</caption>
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Item</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buyItems.map(item => {
//               return (
//                 <tr key={item.id}>
//                   <th scope="row">{id++}</th>
//                   <td>{item.item.name}</td>
//                   {/* <td>{item.item}</td> */}
//                   <td>
//                     <button
//                       onClick={e => this.removeItem(item)}
//                       type="button"
//                       className="btn btn-default btn-sm"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="2">&nbsp;</td>
//               <td>
//                 <button
//                   onClick={e => this.clearAll()}
//                   className="btn btn-default btn-sm"
//                 >
//                   Clear List
//                 </button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       )
//     );
//   }

//   onPressAdd = () => {
//     // this.addItems({ words: [] });
//     this.addItems({ words: words.words });
//   };

//   addItems = ({ words }) => {
//     console.log("words", words); // zzz

//     const newItem = { name: "cat", color: "black" };

//     // console.log("words", words.docs); // zzz

//     // const someWords = words;
//     const someWords = words.slice(0, 5);

//     someWords.forEach(async word => {
//       console.log("word", word); // zzz

//       try {
//         axios
//           .post(
//             "https://us-central1-happy-reader-7.cloudfunctions.net/addItem",
//             {
//               word
//               // item: word
//             }
//           )
//           .then(response => {
//             this.setState({
//               buyItems: response.data,
//               message: ""
//             });
//             this.addForm.reset();
//           });
//       } catch (err) {
//         console.log("error", err); // zzz
//       }
//     });
//   };

//   render() {
//     const { buyItems, message } = this.state;
//     return (
//       <div className="container">
//         <Button onClick={this.onPressAdd}>Load Data to DataBase</Button>
//         <h1>Shopping List - Happy Reader 7</h1>
//         <div className="content">
//           <form
//             ref={input => {
//               this.addForm = input;
//             }}
//             className="form-inline"
//             onSubmit={this.addItem.bind(this)}
//           >
//             <div className="form-group">
//               <label htmlFor="newItemInput" className="sr-only">
//                 Add New Item
//               </label>
//               <input
//                 ref={input => {
//                   this.newItem = input;
//                 }}
//                 type="text"
//                 className="form-control"
//                 id="newItemInput"
//               />
//             </div>
//             <button className="btn btn-primary">Add</button>
//           </form>
//           {(message !== "" || buyItems.length === 0) && (
//             <p className="message text-danger">{message}</p>
//           )}

//           {this.renderItems()}
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
