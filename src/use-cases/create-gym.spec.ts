import { expect, describe, it, beforeEach } from 'vitest'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -2.5660155,
      longitude: -44.2834569,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
