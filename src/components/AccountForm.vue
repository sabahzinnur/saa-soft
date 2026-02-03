<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {z} from 'zod';
import {zodResolver} from '@primevue/forms/resolvers/zod';
import {accountTypes, type Account, type AccountType} from "../entities";

const TAGS_SEPARATOR = ';'

const props = defineProps<{ account: Account }>()
const emit = defineEmits<{ (e: 'update', value: { valid: boolean, data: Account }): void }>()


const schema = z.object({
  login: z.string()
      .min(1, 'Это поле обязательное')
      .max(100, 'Максимум 100 символов'),
  password: z.string()
      .min(1, 'Это поле обязательное')
      .max(100, 'Максимум 100 символов')
      .nullable()
})

const resolver = ref(zodResolver(schema))

const data = reactive<Account>({...props.account})

function handleTagsInput(event: Event & { target: HTMLInputElement }) {
  data.tags = event.target?.value?.split(TAGS_SEPARATOR).filter(Boolean) || []
}

function handleTypeInput(value: AccountType) {
  data.type = value;
  if (value === 'LDAP') {
    data.password = null
  }
}

watch(data,  () => {
  const validationResult = schema.safeParse(data)
  emit('update', { valid: validationResult.success, data })
})

</script>

<template>
  <Form class="form" validate-on-blur validate-on-mount :resolver="resolver" :initial-values="data">
    <FormField name="tags"
               :initial-value="data.tags.join(TAGS_SEPARATOR)"
               class="form-field"
               @change="handleTagsInput">
      <InputText type="text" placeholder="Теги вводить через ;"/>
    </FormField>
    <FormField name="type"
               :initialValue="accountTypes.find(item => item.value ===data.type)"
               class="form-field">
      <Select :name="data.type"
              size="small"
              checkmark
              :options="accountTypes"
              optionLabel="name"
              @change="handleTypeInput($event.value.value)"
      />
    </FormField>
    <FormField v-slot="$field" name="login" class="form-field"
               :class="{ 'full-width': data.type === 'LDAP'}">
      <InputText v-model="data.login" type="text" placeholder="Логин"/>
      <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
          $field.error?.message
        }}
      </Message>
    </FormField>
    <FormField v-if="data.type === 'local'"
               v-slot="$field"
               name="password"
               class="form-field">
      <Password v-model="data.password" toggle-mask :feedback="false" placeholder="Пароль"/>
      <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
          $field.error?.message
        }}
      </Message>
    </FormField>
  </Form>
</template>

<style scoped>
.form {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & .form-field {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    text-align: start;

    &.full-width {
      min-width: calc(200px * 2 + 3rem);
    }
  }
}

</style>