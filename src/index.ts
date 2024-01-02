type _Register = {
  callback: (ev: KeyboardEvent) => void;
  key: string;
  active: boolean;
  id: string;
  uuid?: string;
};

class keyBoardManager {
  private Register: Array<_Register> = [];
  constructor() {
    document.addEventListener("keypress", (ev) => {
      this.Register.map((reg) => {
        if (!reg.active) return;
        if (ev.key == reg.key) reg.callback(ev);
      });
    });
  }
  /** event with the same id will be  */
  add(event: _Register) {
    event = { ...event, uuid: event.uuid || crypto.randomUUID() };
    this.Register.push(event);
    return event.uuid;
  }
  remove(uuid: string) {
    const index = this.Register.findIndex((e) => e.uuid == uuid);
    index != -1 ? this.Register.splice(index, 1) : null;
  }
  activate(id: string) {
    this.Register = this.Register.map((e) => {
      if (e.id == id) {
        return { ...e, active: true };
      } else return e;
    });
    return this;
  }
  deactivate(id: string) {
    this.Register = this.Register.map((e) => {
      if (e.id == id) {
        return { ...e, active: false };
      } else return e;
    });
    return this;
  }
}

const keyboard = new keyBoardManager();

export default keyboard;
