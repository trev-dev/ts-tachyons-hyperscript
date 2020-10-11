import './styles.ts'
import h from 'hyperscript'
import hh from 'hyperscript-helpers'

const { div, button } = hh(h)

function view(model: number) {
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({ className: 'pv1 ph2 mr2' }, '+'),
    button({ className: 'pv1 ph2' }, '-')
  ])
}


const root = document.getElementById('app')!

root.appendChild(view(0))

