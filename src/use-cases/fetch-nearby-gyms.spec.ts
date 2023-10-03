import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -2.5660155,
      longitude: -44.2834569,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -2.975913,
      longitude: -44.323114,
    })

    const { gyms } = await sut.execute({
      userLatitude: -2.5672331,
      userLongitude: -44.3532868,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
