class DispatchedSchedulesService {
  get key(): string {
    return 'DispatchedSchedule';
  }

  public async execute(data: any): Promise<void> {
    console.log('dispatched', data);
  }
}

export default DispatchedSchedulesService;
