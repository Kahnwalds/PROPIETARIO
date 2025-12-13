<template>
  <div>
    <h1>Inventario</h1>

    <form @submit.prevent="isEditing ? updateItem() : createItem()">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model="form.descripcion" placeholder="Descripción" />
      <input type="number" v-model="form.cantidad" placeholder="Cantidad" />
      <input type="number" v-model="form.precio" placeholder="Precio" />
      <input v-model="form.categoria" placeholder="Categoría" />
      <input type="file" @change="onFileChange" />

      <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
      <button v-if="isEditing" type="button" @click="cancelEdit">Cancelar</button>
    </form>

    <table border="1">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventario" :key="item._id">
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.precio }}</td>
          <td>{{ item.categoria }}</td>
          <td>
            <button @click="editItem(item)">Editar</button>
            <button @click="deleteItem(item._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import inventarioApi from '@/api/inventario'

export default {
  name: 'InventarioView',
  data() {
    return {
      inventario: [],
      isEditing: false,
      currentId: null,
      form: {
        nombre: '',
        descripcion: '',
        cantidad: '',
        precio: '',
        categoria: '',
        imagen: null
      }
    }
  },
  mounted() {
    this.loadInventario()
  },
  methods: {
    async loadInventario() {
      this.inventario = await inventarioApi.getAll()
    },
    onFileChange(e) {
      this.form.imagen = e.target.files[0]
    },
    async createItem() {
      await inventarioApi.create(this.form)
      this.resetForm()
      this.loadInventario()
    },
    editItem(item) {
      this.isEditing = true
      this.currentId = item._id
      this.form = { ...item, imagen: null }
    },
    async updateItem() {
      await inventarioApi.update(this.currentId, this.form)
      this.cancelEdit()
      this.loadInventario()
    },
    async deleteItem(id) {
      if (!confirm('¿Eliminar item?')) return
      await inventarioApi.remove(id)
      this.loadInventario()
    },
    cancelEdit() {
      this.isEditing = false
      this.currentId = null
      this.resetForm()
    },
    resetForm() {
      this.form = {
        nombre: '',
        descripcion: '',
        cantidad: '',
        precio: '',
        categoria: '',
        imagen: null
      }
    }
  }
}
</script>
