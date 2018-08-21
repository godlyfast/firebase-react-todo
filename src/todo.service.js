export default class TodoService {
  apiUrl = 'https://us-central1-react-todo-f23c1.cloudfunctions.net'
  fetch() {
    return new Promise((res, rej) => {
      fetch(this.apiUrl + '/todos/')
      .then(data =>
        res(data.json())
      ).catch(err => rej(err))
    })
  }
  create(body) {
    return new Promise((res, rej) => {
      fetch(this.apiUrl + '/todos/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        },
      })
      .then(data =>
        res(data.json())
      ).catch(err => rej(err))
    })
  }
  remove(id) {
    return new Promise((res, rej) => {
      fetch(
        this.apiUrl + '/todos/object/' + id,
        {
          method: "DELETE"
        }
      )
      .then(data =>
        res(data.json())
      ).catch(err => rej(err))
    })
  }
}
