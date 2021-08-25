class Command {

    constructor(client, options){
      this.client = client
      //nome do comando
      this.name = options.name
      // descrição do comando 
      this.description = options.description
      //as opçoes (argumentos) do comando 
      this.options = options.options
    }
   
}

module.exports = Command