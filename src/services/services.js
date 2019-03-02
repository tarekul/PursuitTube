class Services {
    
    /*
        @func addUser
        @params userName {str}
        @desc does some light validation
              adds user obj to the users arr of objs.
    */

    addUser = userName => {
        if (userName.length < 1 || typeof userName !== 'string' || userName.length > 30) {
            alert('Wrong Input.')
            return;
        }
        
        const userArrStr = localStorage.getItem('users');
        console.log(userArrStr);
        
        if (userArrStr) {
            const parsedUserArr = JSON.parse(userArrStr);
            parsedUserArr.push({
                name: `${userName}`,
                feed: ['Music'],
            });
            localStorage.setItem('users', JSON.stringify(parsedUserArr));
        } else {
            const userObj = {
                name: `${userName}`,
                feed: ['Music'],
            }
            localStorage.setItem('users', JSON.stringify([userObj]));
        }
    }

    /*
        @func getUser
        @params userName {str}
        @desc returns user that matches the userName param
    */

    getUser = userName => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                return user;
            }
        }
    }

    /*
        @func getUsers
        @params {null}
        @desc returns all users that currently live on 
                localstorage, takes no params
    */

    getUsers = () => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        return parsedUserArr;
    }

    /*
        @func activeUser
        @params userName {str}
        @desc simple func needed on the feed
                to know what set the active user
    */

    activeUser = (userName) => localStorage.setItem('activeUser', userName);

    /*
        @func getActiveUser
        @params {null}
        @desc simple func needed on the feed
                it gives back a str w active user
    */    

    getActiveUser = () => localStorage.getItem('activeUser');

    /*
        @func deleteUser
        @params userName {str}
        @desc deletes a user obj from the users arr of objs
                matches the user to the userName param
    */

    deleteUser = userName => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        let newUserArr = [];
        let userIndex = 0;
        for (let user of parsedUserArr) {
            if (userName === user.name) {
                userIndex = parsedUserArr.indexOf(user);
                break;
            }
        } 
    
        (userIndex <= 0) ? newUserArr = parsedUserArr.slice(userIndex + 1) 
            : newUserArr = parsedUserArr.slice(0, userIndex).concat(parsedUserArr.slice(userIndex + 1));

        const newUserArrStr = JSON.stringify(newUserArr);
        localStorage.setItem('users', newUserArrStr);
    }

    /*
        @func addFeed
        @params userName {str}, feedName {str}
        @desc uses the userName param to match to the respective user obj
                then adds the feed arr to the user obj
    */

    addFeed = (userName, feedName) => {
        if (userName.length < 1 || typeof userName !== 'string') {
            alert('Wrong Input.')
            return;
        }

        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                user.feed.push(feedName);
            }
        }
        localStorage.setItem('users', JSON.stringify(parsedUserArr));
    }

    /*
        @func getFeed
        @params userName {str}
        @desc takes the userName param to match it to the respective user obj
                goes into the metioned obj and returns its feed arr
    */

    getFeed = userName => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                return user.feed;
            }
        }
    }

    /*
        @func deleteFeed
        @params userName {str}, feedName {str}
        @desc identifies user and deletes specified feed
    */

    deleteFeed = (userName, feedName) => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        let newFeedArr = [];
        
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                const indexToDelete = user.feed.indexOf(feedName);
                if (indexToDelete === 0) {
                    newFeedArr = user.feed.slice(indexToDelete + 1);
                    user.feed = newFeedArr;
                } else {
                    newFeedArr = user.feed.slice(0, indexToDelete).concat(user.feed.slice(indexToDelete + 1));
                    user.feed = newFeedArr;
                }
            }
        }
        const newUserArr = JSON.stringify(parsedUserArr);
        localStorage.setItem('users', newUserArr);
    }

    /*
        @func addVideo
        @params id {str}
        @desc does some light validation
                adds id string to the video key 
    */

    addVideo = id => {
        if (id.length < 1) alert('Video ID is too short.');
        localStorage.setItem('video', id);
    }

    /*
        @func getVideo
        @params {null}
        @desc takes to params and returns video id str
    */

    getVideo = () => localStorage.getItem('video');

    /*
        @func addSearch
        @params searchQuery {str}
        @desc does some light validation
                adds searchQuery str to the search key
    */

    addSearch = searchQuery => {
        if (searchQuery.length < 1) alert('Search keyword is too short.');
        localStorage.setItem('search', searchQuery);
    }

    /*
        @func getSearch
        @params {null}
        @desc takes no params 
                returns search str 
    */

    getSearch = () => localStorage.getItem("search");

    /*
        @func addHistory
        @params activeUser {str}, videoObj {str}
        @desc takes active user and videoObj and stores
                as key-value pair.
    */

    addHistory = (activeUser,videoObj) =>{
        if(localStorage.getItem('history')){
            let history = JSON.parse(localStorage.getItem('history'))
            if(history[activeUser]){
                history[activeUser].push(videoObj)
                
            }
            else if(!history[activeUser]){
                history[activeUser] = []
                history[activeUser].push(videoObj)
            }
            localStorage.setItem('history',JSON.stringify(history))
        }
        else if(!localStorage.getItem.history){
            const temp = {}
            temp[activeUser] = [videoObj]
            localStorage.setItem('history',JSON.stringify(temp))
        }    
        
    }

    /*
        @func getHistory
        @params null
        @desc returns video obj
    */

    getHistory = () => localStorage.getItem('history');

    /*
        @func deleteHistory
        @params userName {str}
        @desc takes username param and 
            matches to history obj to 
            delete video history
    */

    deleteHistory = userName => {
        const historyObj = JSON.parse(this.getHistory());
        delete historyObj[userName];
        localStorage.setItem('history', JSON.stringify(historyObj));
    }
}

export default Services;