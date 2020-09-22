<script>
  import { Todos } from '../api'
  import { safeDump, safeLoad } from 'js-yaml'
  $: TODOS = Todos.find()
  function loadTodos() {
    TODOS.forEach(t => Todos.remove(t._id))
  }
</script>

<input
  type="hidden"
  value={safeDump($TODOS).trim()}
  data-harmony-id="DB Todos"
  on:change={e => loadTodos(e.currentTarget.value)} />
<input
  type="hidden"
  data-harmony-id="DB New Todo"
  on:change={e => Todos.insert(safeLoad(e.currentTarget.value))} />

<ul data-harmony-id="Todos">
  {#each $TODOS as todo}
    <li>{todo.title}</li>
  {:else}No todos{/each}
</ul>
