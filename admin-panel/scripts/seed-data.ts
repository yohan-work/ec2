import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'

/**
 * 데이터베이스 시드 데이터 생성 스크립트
 * 테스트용 부서, 역할, 관리자 계정을 생성합니다.
 */
async function seedData() {
  try {
    console.log('🌱 데이터베이스 시드 데이터 생성 시작...')

    // 1. 부서 데이터 생성
    console.log('📊 부서 데이터 생성 중...')
    const departments = await Promise.all([
      prisma.departments.upsert({
        where: { code: 'IT' },
        update: {},
        create: {
          code: 'IT',
          name: 'IT팀',
        },
      }),
      prisma.departments.upsert({
        where: { code: 'HR' },
        update: {},
        create: {
          code: 'HR',
          name: '인사팀',
        },
      }),
      prisma.departments.upsert({
        where: { code: 'FINANCE' },
        update: {},
        create: {
          code: 'FINANCE',
          name: '재무팀',
        },
      }),
    ])

    console.log('✅ 부서 데이터 생성 완료:', departments.length, '개')

    // 2. 역할 데이터 생성
    console.log('👤 역할 데이터 생성 중...')
    const roles = await Promise.all([
      prisma.roles.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
          name: 'ADMIN',
          level: 10,
        },
      }),
      prisma.roles.upsert({
        where: { name: 'MANAGER' },
        update: {},
        create: {
          name: 'MANAGER',
          level: 5,
        },
      }),
      prisma.roles.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
          name: 'USER',
          level: 1,
        },
      }),
    ])

    console.log('✅ 역할 데이터 생성 완료:', roles.length, '개')

    // 3. 테스트 관리자 계정 생성
    console.log('🔐 테스트 관리자 계정 생성 중...')

    const testEmail = 'admin@test.com'
    const testPassword = 'password123'

    // 비밀번호 해시 생성
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(testPassword, saltRounds)

    // IT팀, ADMIN 역할 찾기
    const itDept = departments.find(d => d.code === 'IT')
    const adminRole = roles.find(r => r.name === 'ADMIN')

    if (!itDept || !adminRole) {
      throw new Error('부서 또는 역할 데이터를 찾을 수 없습니다.')
    }

    const testUser = await prisma.admin_users.upsert({
      where: { email: testEmail },
      update: {
        password_hash: passwordHash,
        dept_id: itDept.id,
        role_id: adminRole.id,
        is_active: true,
      },
      create: {
        email: testEmail,
        password_hash: passwordHash,
        dept_id: itDept.id,
        role_id: adminRole.id,
        is_active: true,
      },
    })

    console.log('✅ 테스트 관리자 계정 생성 완료')
    console.log(`   📧 이메일: ${testEmail}`)
    console.log(`   🔑 비밀번호: ${testPassword}`)
    console.log(`   🏢 부서: ${itDept.name} (${itDept.code})`)
    console.log(`   👨‍💼 역할: ${adminRole.name} (레벨 ${adminRole.level})`)

    // 4. 추가 테스트 계정들 생성
    console.log('👥 추가 테스트 계정 생성 중...')

    const hrDept = departments.find(d => d.code === 'HR')
    const managerRole = roles.find(r => r.name === 'MANAGER')
    const userRole = roles.find(r => r.name === 'USER')

    if (hrDept && managerRole) {
      await prisma.admin_users.upsert({
        where: { email: 'manager@test.com' },
        update: {
          password_hash: await bcrypt.hash('manager123', saltRounds),
          dept_id: hrDept.id,
          role_id: managerRole.id,
          is_active: true,
        },
        create: {
          email: 'manager@test.com',
          password_hash: await bcrypt.hash('manager123', saltRounds),
          dept_id: hrDept.id,
          role_id: managerRole.id,
          is_active: true,
        },
      })
    }

    if (itDept && userRole) {
      await prisma.admin_users.upsert({
        where: { email: 'user@test.com' },
        update: {
          password_hash: await bcrypt.hash('user123', saltRounds),
          dept_id: itDept.id,
          role_id: userRole.id,
          is_active: true,
        },
        create: {
          email: 'user@test.com',
          password_hash: await bcrypt.hash('user123', saltRounds),
          dept_id: itDept.id,
          role_id: userRole.id,
          is_active: true,
        },
      })
    }

    console.log('✅ 추가 테스트 계정 생성 완료')

    // 5. 결과 확인
    const totalUsers = await prisma.admin_users.count()
    const totalDepts = await prisma.departments.count()
    const totalRoles = await prisma.roles.count()

    console.log('\n🎉 시드 데이터 생성 완료!')
    console.log(`   👥 총 사용자: ${totalUsers}명`)
    console.log(`   🏢 총 부서: ${totalDepts}개`)
    console.log(`   👨‍💼 총 역할: ${totalRoles}개`)

    console.log('\n📋 테스트 계정 목록:')
    console.log('   1. admin@test.com / password123 (IT팀, ADMIN)')
    console.log('   2. manager@test.com / manager123 (인사팀, MANAGER)')
    console.log('   3. user@test.com / user123 (IT팀, USER)')
  } catch (error) {
    console.error('❌ 시드 데이터 생성 중 오류 발생:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 스크립트 실행
seedData()
  .then(() => {
    console.log('✅ 스크립트 실행 완료')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ 스크립트 실행 실패:', error)
    process.exit(1)
  })

export { seedData }
