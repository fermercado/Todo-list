let localStge = []

const createItem = (nameList, status, descricao, index) => {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
    <div class="todo__top">
              <input type="checkbox" ${status} data-index = ${index}/>
              <div>${nameList} </div>
              <input type="button" value="X" data-index = ${index} />
            </div>
            <div class="desc-list">
                <textarea  
                  type="text"
                  name=""
                  id="textValue"
                  cols=""
                  rows="6"
                 
                  maxlength="100"
                  placeholder="Descricao da tarefa"
                  >${descricao} </textarea> 
            </div>
            <button class="buttonDesc"  data-index = ${index}>Inserir descricao</button>
  `

  document.getElementById('todoList').appendChild(item)
}

const clearList = () => {
  const todolist = document.getElementById('todoList')
  while (todolist.firstChild) {
    todolist.removeChild(todolist.lastChild)
  }
}

const updateWindow = () => {
  clearList()
  localStge.forEach((item, index) =>
    createItem(item.nameList, item.status, item.descricao, index)
  )
}

const createNewItem = event => {
  const key = event.key
  if (key === 'Enter') {
    localStge.push({
      nameList: event.target.value,
      status: 'checked',
      descricao: ''
    })
    event.target.value = ''
    updateWindow()
  }
}
const removerItem = index => {
  localStge.splice(index, 1)
  updateWindow()
}

const teste = index => {
  localStge[index].status = localStge[index].status === '' ? 'checked' : ''
  updateWindow()
}

const clickItem = event => {
  const element = event.target
  if (element.type === 'button') {
    const index = element.dataset.index
    removerItem(index)
  } else if (element.type === 'checkbox') {
    console.log(element.type)
    const index = element.dataset.index
    teste(index)
  }
}
document.getElementById('newItem').addEventListener('keypress', createNewItem)
document.getElementById('todoList').addEventListener('click', clickItem)
