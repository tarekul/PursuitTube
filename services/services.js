class Services {
    constructor() {

    }
    
    /*
        @func addUser
        @params userName {str}
        @desc does some light validation
              
    */

    addUser = userName => {
        if (userName.length < 1 || typeof userName !== 'string' || userNamelength > 10) {
            alert('Wrong Input.')
            return;
        }

        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        parsedUserArr.push({
            name: `${userName}`,
            feed: [],
        });
        localStorage.setItem('users', JSON.stringify(parsedUserArr));
    }

    getUser = userName => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                return user;
            }
        }
    }

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
        
        (userIndex >= 0) ? newUserArr = parsedUserArr.slice(userIndex + 1) 
            : newUserArr = parsedUserArr.slice(0, userIndex).concat(parsedUserArr.slice(userIndex + 1));

        const newUserArrStr = JSON.stringify(newUserArr);
        localStorage.setItem('users', newUserArrStr);
    }

    addFeed = (userName, feedName) => {
        if (userName.length < 1 || typeof userName !== 'string' || userNamelength > 10) {
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

    getFeed = (userName) => {
        const userArrStr = localStorage.getItem('users');
        const parsedUserArr = JSON.parse(userArrStr);
        for (let user of parsedUserArr) {
            if (user.name === userName) {
                return user.feed;
            }
        }
    }

    addVideo = (id) => {
        if (id.length < 1) alert('Video ID is too short.');
        localStorage.setItem('video', id);
    }

    getVideo = () => {
        localStorage.getItem('video');
    }

    addSearch = searchQuery => {
        if (searchQuery.length < 1) alert('Search keyword is too short.');
        localStorage.setItem('search', searchQuery);
    }

    getSearch = () => {
        localStorage.getItem("search");
    }
}