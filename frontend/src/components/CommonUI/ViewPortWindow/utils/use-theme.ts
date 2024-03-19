export interface IOptions {
  label: string
  value: string
}

export const DEFAULT_THEME = 'theme-default'


const addCssFile = (filename) => {
  const head = document.getElementsByTagName('head')[0];
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    if (links[i].href === filename) {
      return; // 如果已经存在相同的文件，则不添加
    }
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  head.appendChild(link);
};

const removeCssFile = (filename) => {
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    if (links[i].href === filename) {
      links[i].remove();
      return;
    }
  }
};

export const useThemeOptions = () => {
  const themeOptions = ref<IOptions[]>([{
    label: 'Default',
    value: DEFAULT_THEME
  }])

  const themes = ref<IOptions[]>([])
  onMounted(async ()=>{
    const res = await fetch('./themes-dist/index.json')
    themes.value = await res.json()

    themes.value.forEach(item => {
      addCssFile(`./themes-dist/${item.value}.css`)
    })

    themeOptions.value = [
      ...themeOptions.value,
      ...themes.value
    ]
  })

  onBeforeUnmount(() => {
    themes.value.forEach(item => {
      removeCssFile(`./themes-dist/${item.value}.css`)
    })
  })

  return {
    themeOptions
  }
}
