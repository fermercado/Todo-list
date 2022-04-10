const getLocal = () => JSON.parse(localStorage.getItem('taskList')) ?? []
const setLocal = localStge =>
  localStorage.setItem('taskList', JSON.stringify(localStge))

const createItem = (nameList, status, descricao, index) => {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
    <div class="todo__top">
              <input type="checkbox" ${status} data-index = '${index}'/>
              <div>${nameList} </div>
              <input type="button" value="X" data-index = '${index}' />
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
                  >${descricao}</textarea> 
            </div>
            <button id="buttonDesc"  data-index = '${index}'>Inserir descricao</button>
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
  const localStge = getLocal()
  localStge.forEach((item, index) =>
    createItem(item.nameList, item.status, item.descricao, index)
  )
}

const createNewItem = event => {
  const key = event.key
  if (key === 'Enter') {
    const localStge = getLocal()
    localStge.push({
      nameList: event.target.value,
      status: '',
      descricao: ''
    })
    setLocal(localStge)
    event.target.value = ''
    updateWindow()
  }
}

const removerItem = index => {
  const localStge = getLocal()
  localStge.splice(index, 1)
  setLocal(localStge)
  updateWindow()
}

const updadeItem = index => {
  const localStge = getLocal()
  localStge[index].status = localStge[index].status === '' ? 'checked' : ''
  setLocal(localStge)
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
    updadeItem(index)
  }
}

document.getElementById('newItem').addEventListener('keypress', createNewItem)
document.getElementById('todoList').addEventListener('click', clickItem)

updateWindow()
