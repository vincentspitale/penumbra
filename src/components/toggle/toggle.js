/*global chrome*/

import React, {Component} from "react"

function insertCode(tabId, isDark) {   
    chrome.tabs.insertCSS(tabId, {
        code: isDark ? "video, embed {  -webkit-filter: invert(100%); } " : "video, embed {  -webkit-filter: none; } ",
        allFrames: true,
        runAt: "document_start"
    });
}



function updateTabs(isDark) {
    chrome.tabs.query({}, function (tabs) {
        for (var i=0; i<tabs.length; ++i) {
            var tab = tabs[i];
            if (tab.url && tab.url.slice(0,4) == "http")
                insertCode(tab.id, isDark);
        }
    })
}

class Toggle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: localStorage.isDark,
        }

    }

    

    toggle() {
        localStorage.isDark = !this.state.isDark
        this.setState({isDark: !this.state.isDark})
    }

    render() { 
        updateTabs(this.state.isDark)
        return <button onClick={() => this.toggle()}>{this.state.isDark ? "Disable Invert" : "Enable Invert"}</button>
    }

    

}

export default Toggle