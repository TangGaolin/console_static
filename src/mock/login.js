const userMap = {
    '13247719350': {
        userInfo: {
            username: '唐高林',
            uid: '001',
            phone_no: '13247719350',
            token: "xxxxx"
        },
        roles: ""
    }
}

export default {
  login: config => {
    const userInfo = JSON.parse(config.data)
    return new Promise((resolve, reject) => {
      if (userMap[userInfo.user]) {
        setTimeout(() => {
          resolve([200, {
            data: userMap[userInfo.user]
          }]);
        }, 500)
      } else {
        reject('账号不正确')
      }
    })
  }
};
