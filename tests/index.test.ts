import { assert, test } from 'vitest'
import Webpack5RemoveUseStrictPlugin from '../src'

test('插件实例化', () => {
  const plugin = new Webpack5RemoveUseStrictPlugin()
  assert.ok(plugin instanceof Webpack5RemoveUseStrictPlugin)
})
