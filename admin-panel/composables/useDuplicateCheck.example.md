# useDuplicateCheck Composable 사용 예시

## 기본 사용법

```vue
<script setup>
import { useDuplicateCheck } from '~/composables/useDuplicateCheck'

// 설정
const duplicateCheckConfig = {
  apiEndpoint: '/api/dms/clients', // API 엔드포인트
  fieldName: 'name', // 중복 체크할 필드명
  errorMessage: '이미 등록된 고객사입니다.', // 에러 메시지
  formField: 'name', // 폼 필드명
}

// Composable 사용
const { checking, error, checkDuplicate, clearError } =
  useDuplicateCheck(duplicateCheckConfig)
</script>
```

## 다양한 엔티티에서 사용

### 1. 직원 관리

```javascript
const employeeConfig = {
  apiEndpoint: '/api/dms/employees',
  fieldName: 'email',
  errorMessage: '이미 등록된 이메일입니다.',
  formField: 'email',
}

const { checkDuplicate: checkEmployeeDuplicate } =
  useDuplicateCheck(employeeConfig)
```

### 2. 프로젝트 관리

```javascript
const projectConfig = {
  apiEndpoint: '/api/dms/projects',
  fieldName: 'title',
  errorMessage: '이미 존재하는 프로젝트명입니다.',
  formField: 'title',
}

const { checkDuplicate: checkProjectDuplicate } =
  useDuplicateCheck(projectConfig)
```

### 3. 부서 관리

```javascript
const departmentConfig = {
  apiEndpoint: '/api/dms/departments',
  fieldName: 'name',
  errorMessage: '이미 존재하는 부서명입니다.',
  formField: 'name',
}

const { checkDuplicate: checkDepartmentDuplicate } =
  useDuplicateCheck(departmentConfig)
```

## 폼 유효성 검사에서 사용

```javascript
const validateForm = async () => {
  // 기본 유효성 검사
  if (!formData.value.name.trim()) {
    formErrors.value.name = '이름을 입력해주세요.'
    return false
  }

  // 중복 확인
  const excludeId = isEdit.value ? editingId.value : null
  const duplicateResult = await checkDuplicate(formData.value.name, excludeId)

  if (!duplicateResult.isValid) {
    formErrors.value.name = duplicateResult.error
    return false
  }

  return true
}
```

## Input 컴포넌트에서 에러 표시

```vue
<template>
  <Input
    v-model="formData.name"
    :error="formErrors.name || error"
    :loading="checking"
  />
</template>
```

## 반환값

- `checking`: 중복 확인 중인지 여부 (boolean)
- `error`: 중복 확인 에러 메시지 (string)
- `checkDuplicate(value, excludeId)`: 중복 확인 함수
- `clearError()`: 에러 메시지 초기화 함수

## checkDuplicate 함수 반환값

```typescript
{
  isValid: boolean,    // 중복이 아닌지 여부
  error: string        // 에러 메시지 (중복인 경우)
}
```
