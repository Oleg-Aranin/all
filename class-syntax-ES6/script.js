class Dropdown {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.items = options.items

    this.$el.querySelector(`.dropdown__label`).textContent = this.items[0].label

    this.$el.addEventListener('click', e => {
        e.target.classList == `dropdown__label` ? this.toggle() : 0
        e.target.tagName.toLowerCase() === `li` ? this.select(e.target.id) : 0
    })

    const itemsHTML = this.items.map(i => `<li id="${i.id}">${i.label}</li>`).join(` `)

    this.$el.querySelector(`.dropdown__nenu`).insertAdjacentHTML(`afterbegin`, itemsHTML)

  }

  select(id) {
      const item = this.items.find(i => i.id === id)
      this.$el.querySelector(`.dropdown__label`).textContent = item.label
      this.toggle()
  }

  toggle() {
    this.$el.classList.toggle(`open`)
  }
}



const dropdown = new Dropdown(`#dropdown`, {
  items: [
    { label: `Москва`, id: `msk` },
    { label: `Санкт-Петербург`, id: `spb` },
    { label: `Новосибирск`,  id: `nsk` },
    { label: `Краснодар`, id: `krdr` }
  ]
})








//
