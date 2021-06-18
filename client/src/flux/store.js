import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  onClicked:true,
  navItems: getSidebarNavItems(),
}
let _storeBlog={
  blogContents:"",
  blogTitle:"",
  blogDescription:""
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.filter={
      country:"",
      state:""
    }
    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload,key,value,contents,title,des }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
        case Constants.SAVE_FILTER:
        console.log(key + value);  
        this.saveFilter(key,value);
        console.log(this.filter);  
          break;
        case Constants.ONCLICK:
          this.BlogSubmit();
          break;
          case Constants.SAVE_CONTENTS:
            this.save_contents(contents);
         
          break;
          case Constants.SAVE_CONTENTS_TITLE:
            this.save_content_title(title);
            
          break;
          case Constants.SAVE_CONTENTS_DES:
            this.save_content_des(des);
          
          break;
          default:
    }
  }
  save_contents(contents){
    _storeBlog.blogContents=contents;
  }
  save_content_title(title)
  {
    _storeBlog.blogTitle=title; 
  }
  save_content_des(des)
  {
    _storeBlog.blogDescription=des; 
  }
  getContents()
  {
    return _storeBlog;
  }

  BlogSubmit()
  {
    this.onClicked=true;
    this.emit("change");    
  }
  ifBlogSubmit()
  {
    return this.onClicked
  }

  saveFilter(key,value){
    this.filter[key]=value;
    this.emit("change");
  }
  filterItems(){
    // this.emit("change");
    return this.filter
  }
  
  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
