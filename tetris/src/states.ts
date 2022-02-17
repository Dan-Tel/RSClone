interface IState {
  nickname: string,
  coins: number,
  lvl: number,
  availableSkins: Set<string>,
  selectedSkin: string,
}

const states: IState = {
  nickname: '',
  coins: 0,
  lvl: 0,
  availableSkins: new Set<string>(['skin-1']),
  selectedSkin: 'skin-1',
}

export function saveStates() {
  localStorage.setItem('tetris-state', JSON.stringify(states));
  localStorage.setItem('tetris-available-skins', JSON.stringify([...states.availableSkins]));
}

export function updateStates() {
  if (localStorage.getItem('tetris-state')) {
    const temp = JSON.parse(localStorage.getItem('tetris-state') as string);

    // eslint-disable-next-line guard-for-in
    for (const key in temp) {
      states[key] = temp[key];
    }
    states.availableSkins = new Set(JSON.parse(localStorage.getItem('tetris-available-skins') as string));
  }
}

export default states;
