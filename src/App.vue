<script setup lang="ts">
import {ref} from "vue"

import {useAccounts} from "./composables/useAccounts.ts"
import AccountForm from "./components/AccountForm.vue"
import {type Account, createAccount} from "./entities"

const {accounts, addAccount, removeAccount, updateAccount} = useAccounts()

const isCreationFormVisible = ref(false)
const newAccount = ref<Account | null>(null)

function openForm() {
  newAccount.value = createAccount()
  isCreationFormVisible.value = true
}

function closeForm() {
  isCreationFormVisible.value = false
  newAccount.value = null
}

function save({valid, data}: { valid: boolean, data: Account }) {
  if (valid) {
    addAccount(data)
    closeForm()
  }
}


function update({valid, data}: { valid: boolean, data: Account }) {
  if (valid) {
    updateAccount(data)
  }
}

</script>

<template>
  <div>
    <div class="page-title">
      <h3>Учетные записи</h3>
      <Button icon="pi pi-plus"
              aria-label="Добавить"
              :disabled="isCreationFormVisible"
              @click="openForm"/>
    </div>


    <div class="accounts-table">
      <Message severity="info" class="info-message">
        <i class="pi pi-question-circle"></i>
        Для указания меток одной пары логин/пароль используйте разделитель ;
      </Message>

      <div class="accounts-table__row" v-for="account in accounts" :key="account.id">
        <AccountForm :account="account" @update="update"/>
        <div class="accounts-table__actions">
          <Button icon="pi pi-trash"
                  aria-label="Удалить"
                  severity="danger"
                  @click="removeAccount(account.id)"/>
        </div>

      </div>

      <div class="accounts-table__row" v-if="isCreationFormVisible && newAccount">
        <AccountForm :account="newAccount" @update="save"/>
        <div class="accounts-table__actions">
          <Button icon="pi pi-trash"
                  aria-label="Удалить"
                  severity="danger"
                  @click="closeForm"/>
        </div>

      </div>
      <div class="accounts-table__row">
        <Button icon="pi pi-plus"
                aria-label="Добавить"
                :disabled="isCreationFormVisible"
                @click="openForm"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.page-title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}


.info-message {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
}

.accounts-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 100%;
}

.accounts-table__row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: end;
}

.accounts-table__actions {
  display: flex;
  align-items: center;
}
</style>
