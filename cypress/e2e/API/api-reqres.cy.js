describe('Automation API Testing - ReqRes.in', () => {
  
  it('GET List Users - Harus mengembalikan status 200', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

  it('GET Single User - Validasi data user spesifik', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
      expect(response.body.data.first_name).to.eq('Janet');
    });
  });

  it('POST Create User - Berhasil membuat user baru', () => {
    const user = {
      name: "Gemini",
      job: "AI Assistant"
    };
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false, 
      user
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(user.name);
      expect(response.body).to.have.property('id');
    });
  });

  it('PUT Update User - Mengupdate seluruh data user', () => {
    const updateData = {
      name: "Gemini Update",
      job: "Senior AI"
    };
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false, 
      updateData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updateData.name);
    });
  });

  it('PATCH Update User - Mengupdate sebagian data user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false,
      body: {
        job: "Lead Developer"
      } 
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq("Lead Developer");
    });
  });

  it('DELETE User - Menghapus user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('POST Login - Berhasil login dengan user terdaftar', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      failOnStatusCode: false, 
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });
});