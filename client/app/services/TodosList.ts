export class TodosList {
  todos:any;
  collection:any;
  uri:string = 'http://192.168.59.103:8080/mway/bikini-todo-app/api';
  model:any = Bikini.Model.extend({
    idAttribute: '_id'
  });
  store:any;

  constructor() {
    var self = this;
    this.store = new Bikini.BikiniStore({
      useLocalStore: true,
      useSocketNotify: true,
      useOfflineChanges: true,
      socketQuery: 'x-approval-devicetoken=' + encodeURIComponent('cGFzY2FsOmhhbGxvMTIzNA'),
      error: self.handleError.bind(self)
    });
    this.collection = Bikini.Collection.extend({
      model: self.model,
      entity: 'todos',
      store: self.store,
      url: self.uri
    });
    this.todos = new this.collection();
  }

  fetch() {
    return this.todos.fetch();
  }

  get(id) {
    return this.todos.get(id);
  }
  save(id, options){
    let model = this.get(id);
    return model.save(options);
  }
  handleError(model, error) {
    // eventually an xhr response was incorrectly passed instead of an error
    if (error && !error.message && error.responseJSON && error.responseJSON.error) {
      error = error.responseJSON.error;
    }

    // extract viable information, model and/or error may be undefined/null
    var objectId = model && model.attributes && model.attributes.header && model.attributes.header.objectId;
    var message = error && error.message;
    if (typeof message === 'string') {
      // strip off potential server-side JavaScript stack trace
      var strip = message.lastIndexOf('-- ');
      if (strip >= 0) {
        message = message.substring(0, strip);
      }
      // replace new-lines with HTML line breaks
      var index = -1;
      while (index < message.length && (index = message.indexOf('\n', index + 1)) > 0) {
        message = message.substring(0, index) + '<br />' + message.substring(index + 1);
      }
    }
  }
}
